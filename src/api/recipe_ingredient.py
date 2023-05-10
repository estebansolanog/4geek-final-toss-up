from flask_sqlalchemy import SQLAlchemy
from .db import db
from .recipe import Recipe
from .ingredient import Ingredient
# Recipe_ingredient = db.Table('recipe_ingredient',
#     db.Column('id_recipe', db.Integer, db.ForeignKey('recipe.id_recipe'), primary_key=True),
#     db.Column('id_ingredient', db.Integer, db.ForeignKey('ingredient.id_ingredient'), primary_key=True)
# )

# class Recipe_ingredient(db.Model):
#     __tablename__ = 'recipe_ingredient'
#     id=db.Column(db.Integer, primary_key=True)
#     id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), nullable=False)
#     id_ingredient = db.Column(db.Integer, db.ForeignKey('ingredient.id_ingredient', nullable=False))

class Recipe_ingredient(db.Model):
    __tablename__ = 'recipe_ingredient'
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), primary_key=True)
    id_ingredient = db.Column(db.Integer, db.ForeignKey('ingredient.id_ingredient'), primary_key=True)
