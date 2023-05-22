"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
import smtplib
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.admin import setup_admin
from api.commands import setup_commands
from api.extensions import jwt, bcrypt
from api.routesUsers import api
from api.routesChat import chat
from api.db import db
from api.user import User
from datetime import datetime, timedelta
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_jwt_extended import JWTManager, create_access_token, decode_token
from itsdangerous import URLSafeTimedSerializer


#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

# Setup JWT
app.config["JWT_SECRET_KEY"] = os.getenv("FLASK_APP_KEY")
jwt.init_app(app)

#Setup Bcrypt
bcrypt.init_app(app)

app.url_map.strict_slashes = False


# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)
with app.app_context():
        db.create_all()

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')
app.register_blueprint(chat, url_prefix='/chat')

s = URLSafeTimedSerializer(app.config["JWT_SECRET_KEY"])

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

@app.route('/api/reset_password', methods=['POST'])
def forgot_password():
    body= request.json
    email = body["email"]
    user = User.query.filter_by(email=email).first()

    if user:
        token = s.dumps(user.id).replace('.','_')
        send_reset_email(email, token)
        return jsonify({'message': "Correo enviado"})
    else:
        return jsonify({'error': 'No se encontró ningún usuario con ese correo electrónico'})

def send_reset_email(email, token):
    # Configura los detalles del correo electrónico
    sender_email = 'your-email@example.com'
    sender_password = 'your-email-password'
    recipient_email = email
    subject = 'Restablecimiento de contraseña'
    body =f'Haga clic en este enlace para restablecer su contraseña: http://localhost:3000/new_password/{token}'

    # Crea el mensaje de correo electrónico
    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = subject
    message.attach(MIMEText(body, 'plain'))

    # Envía el correo electrónico utilizando SMTP
    with smtplib.SMTP_SSL('smtp.gmail.com', 465) as smtp:
        smtp.login(os.environ.get('EMAIL'), os.environ.get('PASSWORD')
)
        smtp.send_message(message)

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
