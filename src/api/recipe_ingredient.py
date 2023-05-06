from flask_sqlalchemy import SQLAlchemy
from .db import db

Recipe_ingredient = db.Table('recipe_ingredient',
    db.Column('id_recipe', db.Integer, db.ForeignKey('recipe.id_recipe'), primary_key=True),
    db.Column('id_ingredient', db.Integer, db.ForeignKey('ingredient.id_ingredient'), primary_key=True)
)
