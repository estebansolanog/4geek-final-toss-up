from flask_sqlalchemy import SQLAlchemy
from .db import db

class Category(db.Model):
    id_category = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    recipes = db.relationship('Recipe', backref='category', lazy=True)
    
    def serialize(self):
        return {
        "id_category": self.id_category,
        "name": self.name,
        "recipes": [recipe.serialize() for recipe in self.recipes]
        }


