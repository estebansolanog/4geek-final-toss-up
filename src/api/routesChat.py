import os

import openai
from flask import Flask, redirect, render_template, request, url_for

# app = Flask(__name__)
openai.api_key = os.getenv("OPENAI_API_KEY")

from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.modelsChat import db, RecipeChat
from api.user import User
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

#LIBRERIA PARA VALIDAR EMAIL, valida que el dominio exista y que tenga un formato valida de email.
# from email_validator import validate_email, EmailNotValidError

#PARA MANEJAR LA ENCRIPTACIÓN DE LA INFORMACIÓN. ADICIONAL SE REQUIERE, FLASK, REQUEST, JSONIFY, SIN EMBARGO ESOS YA FUERON INSTALADOS ARRIBA.
from flask_jwt_extended import get_jwt
from flask_jwt_extended import JWTManager


chat = Blueprint('chat', __name__)

@chat.route("/chat", methods=("GET", "POST"))
def index():
    if request.method == "POST":
        animal = request.form["animal"]
        response = openai.Completion.create(
            model="text-davinci-003",
            prompt=generate_prompt(animal),
            temperature=0.6,
        )
        return redirect(url_for("index", result=response.choices[0].text))

    result = request.args.get("result")
    return render_template("index.html", result=result)


def generate_prompt(animal):
    return """Suggest three names for an animal that is a superhero.

Animal: Cat
Names: Captain Sharpclaw, Agent Fluffball, The Incredible Feline
Animal: Dog
Names: Ruff the Protector, Wonder Canine, Sir Barks-a-Lot
Animal: {}
Names:""".format(
        animal.capitalize()
    )


@chat.route('/get_recipe', methods=['GET'])
def get_all_recipes():

    recipe = RecipeChat.query.all()
    recipe = list(map(lambda item: item.serialize(), recipe))
    print(recipe)

    return jsonify(recipe), 200



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