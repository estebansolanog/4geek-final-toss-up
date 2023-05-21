from flask_sqlalchemy import SQLAlchemy
from .db import db

class Country(db.Model):
    __tablename__="countries"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    
    #Relacion comentada dado que no esta en uso
    # id_recipe = db.relationship('Recipe', backref='country', lazy=True)
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "id_recipe": [recipe.serialize() for recipe in self.recipes]
        }