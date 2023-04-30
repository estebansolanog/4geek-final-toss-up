from flask_sqlalchemy import SQLAlchemy
from .db import db

recipe_ingredient = db.Table('recipe_ingredient',
    db.Column('recipe_id', db.Integer, db.ForeignKey('recipe.id_recipe'), primary_key=True),
    db.Column('ingredient_id', db.Integer, db.ForeignKey('ingredient.id_ingredient'), primary_key=True)
)

class Ingredient(db.Model):
    id_ingredient = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    recipes = db.relationship('Recipe', secondary=recipe_ingredient, backref='ingredients', lazy='dynamic')
    
    def serialize(self):
        return {
            "id_ingredient": self.id_ingredient,
            "name": self.name,
            "recipes": [recipe.serialize() for recipe in self.recipes]
        }