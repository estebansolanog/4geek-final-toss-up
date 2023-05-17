from flask_sqlalchemy import SQLAlchemy
from .db import db
from .countries import Country
class User(db.Model):
    __tablename__="users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    last_name = db.Column(db.String(120), unique=False, nullable=False)
    password = db.Column(db.String(180), unique=False, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    birth_date = db.Column(db.Date, nullable=True, default=None)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)
    gender = db.Column(db.String(20), nullable=True)
    otp = db.Column(db.Integer, nullable=True)
    otp_active = db.Column(db.Boolean(), unique=False, nullable=True, default=False)
    country_id=db.Column(db.Integer, db.ForeignKey('countries.id'))
    recipes = db.relationship("Recipe", backref="users", lazy=True)
    likes = db.relationship("Like", backref="users", lazy=True)
    favoritos = db.relationship("Favorite", backref="users", lazy=True)
    coments = db.relationship("Coment", backref="users", lazy=True)
    recipes_chat = db.relationship("RecipeChat", backref="users", lazy=True)
    def __repr__(self):
        return f"<User {self.id}>"
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "last_name": self.last_name,
            "password": self.password,
            "email": self.email,
            "birth_date": self.birth_date,
            "is_active": self.is_active,
            "gender":self.gender,
            "otp": self.otp,
            "otp_active": self.otp_active,
            "country_id": self.country_id,
            "recipes": [recipe.id for recipe in self.recipes],
            "likes": [like.id for like in self.likes],
            "favoritos": [favorito.id for favorito in self.favoritos],
            "coments": [coment.id for coment in self.coments],
            "recipes_chat": [recipe_chat.id for recipe_chat in self.recipes_chat]
        }