from flask_sqlalchemy import SQLAlchemy
from .db import db

class Country(db.Model):
    id_country = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    id_recipe = db.relationship('Recipe', backref='country', lazy=True)
    
    def serialize(self):
        return {
            "id_country": self.id_country,
            "name": self.name,
            "id_recipe": [recipe.serialize() for recipe in self.recipes]
        }



