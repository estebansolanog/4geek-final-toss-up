from flask_sqlalchemy import SQLAlchemy
from .db import db

class Country(db.Model):
    __tablename__="countries"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    
    users = db.relationship('User', backref='countries', lazy=True)
    recipes = db.relationship('Recipe', backref='countries', lazy=True)

    def __repr__(self):
        return f"<Country {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "users": [user.id for user in self.users],
            "recipes": [recipe.id for recipe in self.recipes]
        }