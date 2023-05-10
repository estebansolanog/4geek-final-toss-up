"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.user import db, User, TokenBlokedList
from api.favoritos import Favorito
from api.utils import generate_sitemap, APIException

from api.extensions import jwt, bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import re

#RUTAS QUE ENCONTRARÁ EN ESTE ARCHIVO: 1) USER REGISTER, 2) USER LOGIN, 3) USER DELETE, 4) USER UPDATE, 5) USER ACOUNT, 6) USER LOGOUT 

#PARA OPERACIONES CON FECHAS Y HORAS.
from datetime import date, time, datetime, timezone, timedelta #timedelta, es para hacer resta de horas.

# LIBRERIA PARA VALIDAR EMAIL, valida que el dominio exista y que tenga un formato valida de email.
from email_validator import validate_email, EmailNotValidError

#PARA MANEJAR LA ENCRIPTACIÓN DE LA INFORMACIÓN. ADICIONAL SE REQUIERE, FLASK, REQUEST, JSONIFY, SIN EMBARGO ESOS YA FUERON INSTALADOS ARRIBA.
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)


# Handle/serialize errors like a JSON object
@api.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code


#Funcion de verificación de token:
def verificacionToken(identity):
    jti = identity["jti"]
    token = TokenBlokedList.query.filter_by(token=jti, is_blocked=True).first()
    
    if token:
        return True  # Token bloqueado
    else:
        return False  # Token no bloqueado


#Función para validar los requisitos de la contraseña, avanzada.
def validate_password(password):
    # Verifica la longitud mínima y máxima de la contraseña
    if len(password) < 8 or len(password) > 64:
        return False

    # Verifica si contiene al menos una letra mayúscula
    if not re.search("[A-Z]", password):
        return False

    # Verifica si contiene al menos una letra minúscula
    if not re.search("[a-z]", password):
        return False

    # Verifica si contiene al menos un número
    if not re.search("[0-9]", password):
        return False

    # Verifica si contiene al menos un símbolo especial, incluido '*'
    if not re.search("[@#$%^&+=*/]", password):
        return False

    # Verifica si la contraseña es una de las más comunes
    contrasenas_comunes = ['123456', '123456789', 'qwerty', 'password', 'admin']
    if password in contrasenas_comunes:
        return False

    # Si cumple con todos los requisitos, devuelve True
    return True


#0 - [GET] /people Listar todos los registros de people en la base de datos

@api.route('/all_users', methods=['GET'])
def get_all_users():

    user = User.query.all()
    user = list(map(lambda item: item.serialize(), user))
    print(user)

    return jsonify(user), 200


#1 - REGISTRO DE USUARIO.
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-1-REGISTRO-DE-USUARIO-7ed225b8b61a4461a68413a37253434c
@api.route('/register/user', methods=['POST'])
def register_user():

    # Obtenemos los datos del cuerpo de la solicitud
    body = request.get_json()

    # Si el cuerpo está vacío, lanzamos un error
    if not body:
        raise APIException({"message": "Necesitas especificar el body"}, status_code=400)

    # Verificamos que todos los campos requeridos estén presentes
    for field in ["email", "name", "last_name", "password"]:
        if field not in body:
            raise APIException({"message": f"Necesitas especificar {field}"}, status_code=400)

    # Extraemos los datos del cuerpo
    name = body["name"]
    last_name = body["last_name"]
    email = body["email"]
    password = body["password"]

    # Validar el formato del correo electrónico
    try:
        validate_email(email)
        print(f"Email is valid: {email}")  # Agregamos esta línea para mostrar que el correo electrónico es válido
    except EmailNotValidError:
        return jsonify({"message": "El formato del correo electrónico es inválido."}), 400

    # Validamos la contraseña y lanzamos un error si no cumple con los requisitos
    if not validate_password(password):
        raise APIException({"message": "La contraseña debe tener al menos 8 caracteres, incluyendo una letra mayúscula, una letra minúscula, un número y al menos un simbolo especial (@#$%^&+=*/)"}, status_code=400)

    # if password != password_confirmation:
    #     raise APIException({"message": "La contraseña y la confirmación de la contraseña no coinciden"}, status_code=400)

    # Comprobamos si el correo electrónico ya está registrado
    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        raise APIException({"message": "El correo electrónico ya está registrado"}, status_code=400)

    # Encriptamos la contraseña antes de guardarla en la base de datos
    password_escrypted = bcrypt.generate_password_hash(password, 10).decode('utf-8')

    # Creamos un nuevo objeto de usuario y lo agregamos a la base de datos
    new_user = User(email=email, name=name, last_name=last_name, password=password_escrypted)
    db.session.add(new_user)
    db.session.commit()


    # Devolvemos una respuesta JSON con un mensaje y un código de estado HTTP 201 (creado)
    return jsonify({"message": "Usuario creado correctamente"}), 201



#2 - LOGIN DE USUARIO.
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-2-LOGIN-DE-USUARIO-b6b48b0b3ea34b23a55b8b3216cd2ac6?pvs=4

@api.route('/signin', methods=["POST"])  # Corrected the methods parameter
def user_login():
    print("user_login function called")  # Agrega esta línea para depurar

    # Obtenemos los datos del cuerpo de la solicitud    
    email = request.get_json()["email"]
    password = request.get_json()["password"]

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"message": "usuario o contraseña incorrecta"})
 
    if not bcrypt.check_password_hash(user.password, password): #se compara la contrese encriptada, contra la contraseña encrytada que llega desde el usuario.
        return jsonify({"message": "usuario o contraseña incorrecta"})

    # Validación del email.    
    if email != user.email:
        return jsonify({"message": "usuario o contraseña incorrecta"})

    # access_token = create_access_token(identity=user.id)
    access_token = create_access_token(identity=user.id_user, additional_claims={"users_id_user": user.id_user})
    return jsonify({"token": access_token}), 200


#3 - RUTA A LA QUE IRÍA EL USUARIO UNA VEZ SE REGISTRA
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-3-MYACCOUNT-1cf8a6fb177945c4a0ccd4ee0d429698?pvs=4

@api.route("/myaccount", methods=["GET"])
@jwt_required()
def myaccount():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    #VALIDAR si el token existe como bloqueado, con una función previamente definiada.
    token = verificacionToken(get_jwt())

    if token:
        raise APIException({"message":"Inicia sesión para ir a esta rura protegida"})    

    print("El usuario actual es: ", user.name)
    print("El usuario actual es: ", current_user)
    return jsonify({"message":"Estas en una ruta protegida", "name" :user.name}), 200


#4 - LOGOUT DE USER
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-4-LOGOUT-a335628a30224d0aa5755a8a0b7e8d68?pvs=4
@api.route("/logout", methods=["GET"])
@jwt_required()
def user_logout():
    #VER DOCUMENTACION DE LA RUTA ABAJO 
    jti = get_jwt()["jti"] 
    now = datetime.now(timezone.utc)
    
    #identificando al usuario:
    current_user = get_jwt_identity()
    user = User.query.get(current_user)

    token_bloked = TokenBlokedList(token=jti, create_at=now, email=user.email)
    
    #Guardamos la información en base de datos.
    db.session.add(token_bloked)
    db.session.commit()
    return jsonify({"message":"logout successfully"}), 200


#5 - EDITAR UN USUARIO.
#VER DOCUMENTACION ADICIONAL DE ESTA RUTA EN: https://www.notion.so/dicttaapp-5-myaccount-update-be57cae02ef3417d95adea63217cd1b8?pvs=4
@api.route('/myaccount/update', methods=['POST'])
@jwt_required()  # Requiere un token válido para acceder a la ruta.
def update_user():
    # Obtenemos el ID del usuario del token
    jwt_claims = get_jwt()
    user_id = jwt_claims["users_id_user"]

    # Obtenemos la información enviada en la petición
    data = request.get_json()
    email = data["email"]
    name = data["name"]
    last_name = data["last_name"]
    # password = data["password"]

    # Validar el formato del correo electrónico
    try:
        validate_email(email)
    except EmailNotValidError:
        return jsonify({"message": "El formato del correo electrónico es inválido."}), 400

    # Verificamos si el email ya está en uso por otro usuario
    existing_user = User.query.filter(User.email == email, User.id_user != user_id).first()
    if existing_user:
        return jsonify({"message": "El email ya está en uso."}), 409

    # Actualizamos la información del usuario
    user_to_update = User.query.get(user_id)
    if user_to_update:
        user_to_update.email = email
        user_to_update.name = name
        user_to_update.last_name = last_name

        db.session.commit()
        return jsonify({"message": "Usuario actualizado exitosamente."}), 200
    else:
        return jsonify({"message": "Usuario no encontrado."}), 404

    



#6 - ELIMINAR UN USARIO
#VER DOCUMENTACION ADICIONAL DE ESTA RUTA EN: https://www.notion.so/dicttaap-6-myaccount-delete-cbd5495b91854d069be30f53aa00ff26?pvs=4

@api.route('/myaccount/delete', methods=['DELETE'])
@jwt_required()  # Requiere un token válido para acceder a la ruta.
def delete_user():

    # Obtenemos el ID del usuario de las reclamaciones del token JWT.
    jwt_claims = get_jwt()
    # user_id = jwt_claims["user_id"]
    user_id = jwt_claims["users_id_user"]

    # Buscamos al usuario en la base de datos utilizando el ID obtenido.
    user = User.query.get(user_id)

    # Eliminamos el usuario de la base de datos y guardamos los cambios.
    db.session.delete(user)
    db.session.commit()

    # Retornamos un mensaje en formato JSON y el código de estado HTTP 200 (OK).
    return jsonify({"message": "usuario borrado"}), 200



#------------------------------ul----------------------------
#LAS SIGUIENTES SON RUTAS DEMUESTRAS, NO TIENEN QUE VER CON EL FUNCIONAMIENTO DE LA APLICACION:

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():
#     password_encrypted = bcrypt.generate_password_hash("123",10).decode("utf-8")
#     response_body = {
#         "message": password_encrypted
#     }

#     return jsonify(response_body), 200

# @api.route('/hola', methods=['POST', 'GET'])
# def handle_hola():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200








# """
# This module takes care of starting the API Server, Loading the DB and Adding the endpoints
# """
# import os
# from flask import Flask, request, jsonify, url_for, Blueprint, current_app
# from api.models import db, User
# from api.favoritos import Favoritos
# from api.utils import generate_sitemap, APIException

# from api.extensions import jwt, bcrypt
# from flask_jwt_extended import create_access_token
# from flask_jwt_extended import get_jwt_identity
# from flask_jwt_extended import jwt_required
# from flask_jwt_extended import JWTManager

# import smtplib, ssl
# from email.mime.text import MIMEText
# from email.mime.multipart import MIMEMultipart
# from email.mime.base import MIMEBase
# from email import encoders

# api = Blueprint('api', __name__)

# EMAIL = os.environ.get('EMAIL')
# PASSWORD = os.environ.get('PASSWORD')

# @api.route('/hello', methods=['POST', 'GET'])
# def handle_hello():
#     password_encrypted = bcrypt.generate_password_hash("123",10).decode("utf-8")
#     response_body = {
#         "message": password_encrypted
#     }

#     return jsonify(response_body), 200

# @api.route('/hola', methods=['POST', 'GET'])
# def handle_hola():

#     response_body = {
#         "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
#     }

#     return jsonify(response_body), 200

# def sendEmail(message, to, subject):
#     smtp_address = 'smtp.gmai.com'
#     smtp_port = 465 #SSL

#     print(message, to, subject)

#     messageMime = MIMEMultipart('alternative') #json, #text, #application/pdf
#     messageMime['Subject'] = subject
#     messageMime['To'] = to
#     messageMime['From'] = EMAIL

#     html = '''
#     <html>
#     <body>
#     <h1>Hi, '''+ to + '''<h1>
#     </body>
#     </html>
#     '''

#     #Crear elementos MIMEText
#     text_mime = MIMEText(subject, 'plain')
#     html_mime = MIMEText(html, 'html')

#     #adjuntar los MIMEText al MIMEMultipart
#     messageMime.attach(text_mime)
#     messageMime.attach(html_mime)

#     #conectarnos al puerto 465 de GMAIL para enviar el correo
#     context = ssl.create_default_context()
#     with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
#         server.login(EMAIL, PASSWORD)
#         server.sendEmail(EMAIL, to, message,as_string())
    
#     return jsonify({"message":"email sent"}), 200

# @api.route('/email', methods=['POST'])
# def handle_email():
#     body = request.get_json()
#     message = body['message']
#     to = body['to']
#     subject = body['subject']

#     sendEmail(message, to, subject)