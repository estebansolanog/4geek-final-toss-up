from flask_sqlalchemy import SQLAlchemy
from .db import db

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    last_name = db.Column(db.String(120), nullable=False)
    password = db.Column(db.String(180), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)

    birth_date = db.Column(db.Date, nullable=True, default=None)
    is_active = db.Column(db.Boolean(), nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    otp = db.Column(db.Integer, nullable=True)
    otp_active = db.Column(db.Boolean(), nullable=True, default=False)
    recipe_chat = db.relationship("RecipeChat", backref="user", foreign_keys="RecipeChat.user_id", lazy=True)

    # Relación uno-a-muchos con Likes
    likes = db.relationship('Like', backref='user', lazy=True)

    # Relación uno-a-muchos con Favorito
    favoritos = db.relationship('Favorito', backref='user', lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "email": self.email,
            "birth_date": self.birth_date,
            "is_active": self.is_active,
            "gender": self.gender,
            "otp": self.otp,
            "otp_active": self.otp_active
        }
    

# from flask_sqlalchemy import SQLAlchemy
# from .db import db
# from .countries import Country
# class User(db.Model):
#     __tablename__="users"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=False, nullable=False)
#     last_name = db.Column(db.String(120), unique=False, nullable=False)
#     password = db.Column(db.String(180), unique=False, nullable=False)
#     email = db.Column(db.String(120), unique=True, nullable=False)
#     birth_date = db.Column(db.Date, nullable=True, default=None)
#     is_active = db.Column(db.Boolean(), unique=False, nullable=True)
#     gender = db.Column(db.String(20), nullable=True)
#     otp = db.Column(db.Integer, nullable=True)
#     otp_active = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
#     recipe_chat = db.relationship("RecipeChat", backref="users", lazy=True)



#     # Relación uno-a-muchos con Likes
#     # id_likes = db.relationship('Likes', backref='user', lazy=True)
#     # id_favorito = db.relationship('Favorito', backref='user', lazy=True)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "last_name": self.last_name,
#             "password": self.password,
#             "email": self.email,
#             "birth_date": self.birth_date,
#             "is_active": self.is_active,
#             "gender":self.gender,
#             "otp": self.otp,
#             "otp_active": self.otp_active,
#             # "favoritos": self.favoritos
#             # do not serialize the password, its a security breach
#         }