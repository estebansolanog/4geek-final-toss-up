import os

import openai
from flask import Flask, redirect, render_template, request, url_for

# app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.modelsChat import db, RecipeChat
from api.user import User
from api.token_bloked_list import TokenBlokedList
from api.favoritos import Favorito
from api.utils import generate_sitemap, APIException

from api.extensions import jwt, bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask_jwt_extended import JWTManager
import re

#PARA OPERACIONES CON FECHAS Y HORAS.
from datetime import date, time, datetime, timezone, timedelta #timedelta, es para hacer resta de horas.

#PARA MANEJAR LA ENCRIPTACIÓN DE LA INFORMACIÓN. ADICIONAL SE REQUIERE, FLASK, REQUEST, JSONIFY, SIN EMBARGO ESOS YA FUERON INSTALADOS ARRIBA.
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager


chat = Blueprint('chat', __name__)


# Handle/serialize errors like a JSON object
@chat.errorhandler(APIException)
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


@chat.route('/saveRecipe', methods=['POST'])
@jwt_required()
def save_recipe():

    jwt_claims = get_jwt()
    print(jwt_claims)
    user = jwt_claims["users_id_user"]
    
    body = request.get_json()
    
    # Si el cuerpo está vacío, lanzamos un error
    if not body:
        raise APIException({"message": "Necesitas rellenar todos los campos"}, status_code=400)

    # Verificamos que todos los campos requeridos estén presentes
    for field in ["description", "user_query"]:
        if field not in body:
            raise APIException({"message": f"Necesitas especificar {field}"}, status_code=400)

    description = body["description"]
    user_query = body["user_query"]


    # Creamos un nuevo objeto de usuario y lo agregamos a la base de datos
    new_recipe = RecipeChat(description=description, user_id=user, user_query=user_query)
    db.session.add(new_recipe)
    db.session.commit()


    # Devolvemos una respuesta JSON con un mensaje y un código de estado HTTP 201 (creado)
    return jsonify({"message": "Receta guardada correctamente"}), 201


@chat.route('/getChatHistory', methods=['GET'])
@jwt_required()
def get_chat_history():

    jwt_claims = get_jwt()
    print(jwt_claims)
    user_id = jwt_claims["users_id_user"]
    
    recipes = RecipeChat.query.filter_by(user_id=user_id).all()
    recipes = list(map(lambda item: item.serialize(), recipes))
    print(recipes)

    return jsonify(recipes), 200


@chat.route('/chatgpt', methods=['POST'])
def open_ai():
    body =request.get_json()    
    prompt = "Eres una pagina web de recetas que responde con descripcion de la receta, una lista de ingredientes y un paso a paso para preparar la receta solicitada por el usuario: "+ body['prompt']

    completation = openai.Completion.create(engine="text-davinci-003",
                            prompt=prompt,
                            n=1,
                            max_tokens=1024)
    
    #print(completation.choices[0])
    print(completation.choices[0].text)
    response = {
        "message":completation.choices[0].text
    }
    return jsonify(response), 200

# MPT-7b : 64k tokens, ggml, q4_0, 128bits 4Q 
# Oobaboonga, Koboldcpp