"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import re

from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.user import User
from api.db import db
from .token_blocked_list import TokenBlokedList
from api.favoritos import Favorito
from api.recipe import Recipe
from api.categories import Category
from api.countries import Country
from api.ingredient import Ingredient
from api.likes import Like
from api.utils import generate_sitemap, APIException
from api.recipe_ingredient import RecipeIngredient
from datetime import datetime
from itsdangerous import URLSafeTimedSerializer

from api.extensions import jwt, bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import jwt_required, get_jwt
from flask_jwt_extended import JWTManager

import ssl
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart



#RUTAS QUE ENCONTRARÁ EN ESTE ARCHIVO: 1) USER REGISTER, 2) USER LOGIN, 3) USER DELETE, 4) USER UPDATE, 5) USER ACOUNT, 6) USER LOGOUT 

#PARA OPERACIONES CON FECHAS Y HORAS.
from datetime import date, time, datetime, timezone, timedelta #timedelta, es para hacer resta de horas.

# LIBRERIA PARA VALIDAR EMAIL, valida que el dominio exista y que tenga un formato valida de email.
from email_validator import validate_email, EmailNotValidError

#PARA MANEJAR LA ENCRIPTACIÓN DE LA INFORMACIÓN. ADICIONAL SE REQUIERE, FLASK, REQUEST, JSONIFY, SIN EMBARGO ESOS YA FUERON INSTALADOS ARRIBA.
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager


api = Blueprint('api', __name__)

EMAIL = os.environ.get('EMAIL')
PASSWORD = os.environ.get('PASSWORD')

def sendEmail(message, to, subject):
    smtp_address = 'smtp.gmail.com'
    smtp_port = 465 #SSL

    print(message, to, subject)

    messageMime = MIMEMultipart('alternative')
    messageMime['Subject'] = subject
    messageMime['To'] = to
    messageMime['From'] = EMAIL

    html = '''
    <html>
    <body>
    <h1> Hi, ''' + message + ''' </h1>
    </body>
    </html>
    '''

    #crear elementos MIMEtext
    text_mime = MIMEText(message, 'plain')
    #html_mime = MIMEText(html, 'html')

    #adjuntar los MIMEText al MIMEMultipart

    messageMime.attach(text_mime)
    #messageMime.attach(html_mime)

    #conectarnos al puerto 465 de gmail para enviar el correo

    context = ssl.create_default_context()
    emailfrom = EMAIL
    password = PASSWORD
    with smtplib.SMTP_SSL(smtp_address, smtp_port, context=context) as server:
        server.login(emailfrom, password)
        server.sendmail(emailfrom, to, messageMime.as_string())

    return jsonify({"message":"email sent"}), 200

@api.route('/correo', methods=['POST'])
def handle_email():
    body = request.get_json()
    message = body["message"]
    to = body ["to"]
    subject = body ["subject"]

    sendEmail(message, to, subject)

    return jsonify({"message":"message sent"}), 200

#1 - REGISTRO DE USUARIO.
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-1-REGISTRO-DE-USUARIO-7ed225b8b61a4461a68413a37253434c
""" @api.route('/signup', methods=['POST'])
def register_user():

    # Obtenemos los datos del cuerpo de la solicitud
    body = request.get_json()

    # Extraemos los datos del cuerpo

    name = body["name"]
    last_name = body["lastname"]
    email = body["email"]
    password = body["password"]
    country = body["country"]
    gender = body["gender"]
    
    # Si el cuerpo está vacío, lanzamos un error
    if body is None:
        raise APIException("You need to specify the request body as json object", status_code=400) 
    
    # Verificamos que todos los campos requeridos estén presentes

    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)
    if "lastname" not in body:
        raise APIException("You need to specify the lastname", status_code=400)
    if "email" not in body:
        raise APIException("You need to specify the email", status_code=400)
    if "password" not in body:
        raise APIException("You need to specify the password", status_code=400)
    if "country" not in body:
        raise APIException("You need to specify the country", status_code=400)
    if "gender" not in body:
        raise APIException("You need to specify the gender", status_code=400)

    # Verificamos que todos los campos requeridos estén presentes

   
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
 """

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
s = URLSafeTimedSerializer("any key works")

@api.route('/register', methods=['POST'])
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
    access_token = create_access_token(identity=user.id, additional_claims={"users_id": user.id})
    return jsonify({"token": access_token}), 200


#3 - RUTA A LA QUE IRÍA EL USUARIO UNA VEZ SE REGISTRA
#VER DOCUMENTACION ADICIONAL SOBRE ESTA RUTA EN: https://www.notion.so/dicttaapp-3-MYACCOUNT-1cf8a6fb177945c4a0ccd4ee0d429698?pvs=4

@api.route("/myaccount", methods=["GET"])
@jwt_required()
def myaccount():
    # Access the identity of the current user with get_jwt_identity
    current_user = get_jwt_identity()
    print(current_app)
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
    user_id = jwt_claims["users_id"]

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
    existing_user = User.query.filter(User.email == email, User.id != user_id).first()
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
    user_id = jwt_claims["users_id"]

    # Buscamos al usuario en la base de datos utilizando el ID obtenido.
    user = User.query.get(user_id)

    # Eliminamos el usuario de la base de datos y guardamos los cambios.
    db.session.delete(user)
    db.session.commit()

    # Retornamos un mensaje en formato JSON y el código de estado HTTP 200 (OK).
    return jsonify({"message": "usuario borrado"}), 200



#------------------------------ul----------------------------

@api.route('/postrecipe', methods=['POST'])
def create_postrecipe():
    body = request.get_json()

    if body is None:
        return jsonify({"error": "You need to specify the request body as a JSON object"}), 400

    required_fields = ["name", "time", "difficulty", "description", "instructions", "ingredients", "country_name", "category_name"]
    for field in required_fields:
        if field not in body:
            return jsonify({"error": f"You need to specify the '{field}' field"}), 400

    name = body["name"]
    time = body["time"]
    difficulty = body["difficulty"]
    description = body["description"]
    instructions = body["instructions"]
    ingredients = body["ingredients"]
    country_name = body["country_name"]
    category_name = body["category_name"]

    new_recipe = Recipe(
        name=name,
        time=time,
        difficulty=difficulty,
        description=description,
        instructions=instructions,
        id_country=None,  # Replace with the actual country ID
        id_category=None  # Replace with the actual category ID
    )

   # Obtener el país y la categoría del cuerpo de la solicitud
    country_name = body["country_name"]
    category_name = body["category_name"]

    # Buscar el país en la base de datos por su nombre
    country = Country.query.filter_by(name=country_name).first()
    if country:
        new_recipe.id_country = country.id

    # Buscar la categoría en la base de datos por su nombre
    category = Category.query.filter_by(name=category_name).first()
    if category:
        new_recipe.id_category = category.id
 
    # Añadir ingredientes a la receta
    for ingredient_data in ingredients:
        ingredient_name = ingredient_data["name"]
        ingredient_quantity = ingredient_data["quantity"]
        new_ingredient = RecipeIngredient(name=ingredient_name, quantity=ingredient_quantity)
        new_recipe.recipe_ingredients.append(new_ingredient)

    db.session.add(new_recipe)
    db.session.commit()

    return jsonify({"msg": "Recipe created successfully"}), 201

@api.route('/editrecipe/<int:recipe_id>', methods=['PUT'])
def edit_recipe(recipe_id):
    # Verificamos si la receta existe en la base de datos
    recipe = Recipe.query.get(recipe_id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    # Obtenemos los datos enviados en el cuerpo de la solicitud
    body = request.get_json()

    if body is None:
        return jsonify({"error": "You need to specify the request body as a JSON object"}), 400

    # Actualizamos los campos necesarios
    if "name" in body:
        recipe.name = body["name"]
    if "time" in body:
        recipe.time = body["time"]
    if "difficulty" in body:
        recipe.difficulty = body["difficulty"]
    if "description" in body:
        recipe.description = body["description"]
    if "instructions" in body:
        recipe.instructions = body["instructions"]
    if "country_id" in body:
        recipe.id_country = body["country_id"]
    if "category_id" in body:
        recipe.id_category = body["category_id"]

    # Guardamos los cambios en la base de datos
    db.session.commit()

    return jsonify({"msg": "Recipe updated successfully"}), 200

@api.route('/deleterecipe', methods=['DELETE'])
def delete_specific_recipe():
    body = request.get_json()
    recipe_id = body.get("id")

    if not recipe_id:
        return jsonify({"error": "You need to specify the 'id' field"}), 400

    recipe = Recipe.query.get(recipe_id)

    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    db.session.delete(recipe)
    db.session.commit()

    return jsonify({"msg": "Recipe deleted"}), 200


@api.route('/getrecipe/<int:recipe_id>', methods=['GET'])
def get_recipe(recipe_id):
    # Verificamos si la receta existe en la base de datos
    recipe = Recipe.query.get(recipe_id)
    if recipe is None:
        return jsonify({"error": "Recipe not found"}), 404

    # Construimos el objeto JSON con la información de la receta
    recipe_data = {
        "id": recipe.id,
        "name": recipe.name,
        "time": recipe.time,
        "difficulty": recipe.difficulty,
        "description": recipe.description,
        "instructions": recipe.instructions,
        "country_name": recipe.id_country,
        "category_name": recipe.id_category,
        "recipe_ingredients": [ri.serialize() for ri in recipe.recipe_ingredients]
    }

    return jsonify(recipe_data), 200

@api.route('/getfavorito', methods=['GET'])
@jwt_required()  # Requiere un token válido para acceder a la ruta.
def get_favorito():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user is None:
        return {"message": "Usuario no encontrado"}
    favoritos = Favorito.query.filter_by(user_id=user_id).all()
    lista_favoritos = []
    # Obtenemos el ID del usuario del token
    for favorito in favoritos:
        lista_favoritos.append({
            "id": favorito.id,
            "nombre": favorito.nombre,
            # Agrega más campos si es necesario
        })

    return lista_favoritos, 200
    # Aquí debes agregar la lógica para obtener los favoritos del usuario con el ID user_id


@api.route('/postfavorito', methods=['POST'])
def post_favorito():
    body = request.get_json()
    user_id = body["user_id"]
    recipe_id = body["recipe_id"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
    if "user_id" not in body:
        raise APIException("You need to specify the user ID", status_code=400)
    if "recipe_id" not in body:
        raise APIException("You need to specify the recipe ID", status_code=400)

    favorito = Favorito.query.filter_by(user_id=user_id, recipe_id=recipe_id).first()
    if favorito is not None:
        raise APIException("Favorite already exists", status_code=409)

    new_favorite = Favorito(user_id=user_id, recipe_id=recipe_id)

    db.session.add(new_favorite)
    db.session.commit()

    return jsonify({"msg": "Favorite successfully created"}), 201


@api.route('/deletefavoritos', methods=['DELETE'])
def delete_specific_favorite():
    body = request.get_json()
    favorite_id = body["id"]

    favorito = Favorito.query.get(favorite_id)

    if favorito is None:
        return jsonify({"error": "Favorite not found"}), 404

    db.session.delete(favorito)
    db.session.commit()

    return jsonify({"msg": "Favorite deleted"}), 

s = URLSafeTimedSerializer("any key works")

@api.route('/newcategory', methods=['POST'])
def new_category():
    body = request.get_json()
    name = body["name"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
      
    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)

    new_category = Category.query.filter_by(name=name).first()
    if new_category is not None:
        raise APIException("Category already exists", status_code=409)

    new_category = Category(name=name)

    db.session.add(new_category)
    db.session.commit()

    return jsonify({"msg": "Category successfully created"}), 201
 
@api.route('/getcategory', methods=['GET'])
def get_category():
    id = request.args.get("id", None)
    name = request.args.get("name", None)
    
    category_query = Category.query
    if id:
        category_query = category_query.filter_by(id=id)
    if name:
        category_query = category_query.filter_by(name=name)
        
    categories = category_query.all()
    categories = [category.serialize() for category in categories]
    
    return jsonify(categories)

@api.route('/deletecategory', methods=['DELETE'])
def delete_specific_category():
    body = request.get_json()   
    category_id = body["id"]

    category = Category.query.get(category_id)

    if category is None:
        return jsonify({"error": "Category not found"}), 404

    db.session.delete(category)
    db.session.commit()  
  
    return jsonify({"msg": "Category deleted"}), 200


@api.route('/newcountry', methods=['POST'])
def new_country():
    body = request.get_json()
    name = body["name"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
      
    if "name" not in body:
        raise APIException("You need to specify the name", status_code=400)

    new_country = Country.query.filter_by(name=name).first()
    if new_country is not None:
        raise APIException("Country already exists", status_code=409)

    new_country = Country(name=name)

    db.session.add(new_country)
    db.session.commit()

    return jsonify({"msg": "Country successfully created"}), 201


@api.route('/getcountry', methods=['GET'])
def get_country():
    id = request.args.get("id", None)
    name = request.args.get("name", None)
    
    country = Country.query
    if id:
        country = country.filter_by(id=id)
    if name:
        country = country.filter_by(name=name)
        
    country = country.all()
    country_data = [item.serialize() for item in country]
    
    return jsonify(country_data)


@api.route('/deletecountry', methods=['DELETE'])
def delete_specific_country():
    body = request.get_json()   
    country_id = body["id"]

    country = Country.query.get(country_id)

    if country is None:
        return jsonify({"error": "Country not found"}), 404

    db.session.delete(country)
    db.session.commit()  
  
    return jsonify({"msg": "Country deleted"}), 200

@api.route('/newingredient', methods=['POST'])
def new_ingredient():
    body = request.get_json()
    name = body["name"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
      
    
    if "name" not in body:
        raise APIException("You need to specify the name of the ingredient", status_code=400)

    new_ingredient = Ingredient.query.filter_by(name=name).first()
    if new_ingredient is not None:
        raise APIException("Ingredient already exists", status_code=409)

    new_ingredient = Ingredient(name=name)

    db.session.add(new_ingredient)
    db.session.commit()

    return jsonify({"msg": "Ingredient successfully created"}), 201

 
@api.route('/getingredient', methods=['GET'])
def get_ingredient():
    id = request.args.get("id", None)
    name = request.args.get("name", None)
    
    ingredient = Ingredient.query
    if id:
        ingredient = ingredient.filter_by(id=id)
    if name:
        ingredient = ingredient.filter_by(name=name)
        
    ingredient = ingredient.all()
    ingredient = list(map(lambda item: item.serialize(), ingredient))
    return jsonify(ingredient)

@api.route('/putingredient/<int:ingredient_id>', methods=['PUT'])
def put_ingredient(ingredient_id):
    body = request.get_json()

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)

    ingredient = Ingredient.query.get(ingredient_id)
    if ingredient is None:
        raise APIException("Ingredient not found", status_code=404)

    # Actualizar los campos del ingrediente si están presentes en el body
    if "name" in body:
        ingredient.name = body["name"]

    db.session.commit()

    return jsonify({"msg": "Ingredient successfully updated"}), 200

@api.route('/deleteingredient/<int:ingredient_id>', methods=['DELETE'])
def delete_ingredient(ingredient_id):
    ingredient = Ingredient.query.get(ingredient_id)
    if ingredient is None:
        raise APIException("Ingredient not found", status_code=404)

    db.session.delete(ingredient)
    db.session.commit()

    return jsonify({"msg": "Ingredient deleted"}), 200

@api.route('/newlike', methods=['POST'])
def new_like():
    body = request.get_json()
    recipe_id = body["recipe_id"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)
      
    if "recipe_id" not in body:
        raise APIException("You need to specify the ID of the recipe", status_code=400)

    recipe = Recipe.query.get(recipe_id)
    if recipe is None:
        raise APIException("Recipe not found", status_code=404)

    recipe.likes += 1
    db.session.commit()

    return jsonify({"msg": "Like added successfully"}), 200

@api.route('/deletelike', methods=['PUT'])
def delete_like():
    body = request.get_json()
    recipe_id = body["recipe_id"]

    if body is None:
        raise APIException("You need to specify the request body as a JSON object", status_code=400)

    if "recipe_id" not in body:
        raise APIException("You need to specify the ID of the recipe", status_code=400)

    recipe = Recipe.query.get(recipe_id)
    if recipe is None:
        raise APIException("Recipe not found", status_code=404)

    if recipe.likes > 0:
        recipe.likes -= 1
        db.session.commit()

    return jsonify({"msg": "Like deleted successfully"}), 200



@api.route('/new_password', methods=['PUT'])
def new_password():
    body=request.get_json()
    token=body["token"]
    user_id = s.loads(token.replace('_','.'), max_age=1800)
    user = User.query.get(user_id)
    password = body['password']
    user.password = bcrypt.generate_password_hash(password, 10).decode('utf-8')
    db.session.commit()
    return jsonify({'message': 'Password reset successfully'})

