from flask_sqlalchemy import SQLAlchemy
from .db import db


class Ingredient(db.Model):
    __tablename__="ingredient"
    id_ingredient = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    recipe_ingredient = db.relationship('Recipe_ingredient', backref="ingredient", lazy=True)


    def serialize(self):
        return {
            "id_ingredient": self.id_ingredient,
            "name": self.name,
        }