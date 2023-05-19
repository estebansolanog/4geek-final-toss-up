from flask_sqlalchemy import SQLAlchemy
from .db import db
from datetime import datetime

class User(db.Model):
    __tablename__="users"
    id_user = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    last_name = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    birthdate = db.Column(db.Date, nullable=True, default=None)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    country = db.Column(db.String(120), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    otp = db.Column(db.Integer, nullable=True)
    otp_active = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    recipe_chat = db.relationship("RecipeChat", backref="users", lazy=True)



    # Relación uno-a-muchos con Likes
    # id_likes = db.relationship('Likes', backref='user', lazy=True)
    # id_favorito = db.relationship('Favorito', backref='user', lazy=True)

    def serialize(self):
        return {
            "id_user": self.id_user,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "birthdate": self.birthdate.isoformat() if self.birthdate else None,
            "is_active": self.is_active,
            "country": self.country,
            "gender": self.gender,
            "otp": self.otp,
            "otp_active": self.otp_active,
            # "favoritos": self.favoritos
            # do not serialize the password, its a security breach
        }
    