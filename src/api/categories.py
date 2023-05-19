from flask_sqlalchemy import SQLAlchemy
from .db import db

class Category(db.Model):
    __tablename__="categories"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)

    recipes = db.relationship('Recipe', backref='categories', lazy=True)

    def __repr__(self):
        return f"<Category {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "recipes": [recipe.id for recipe in self.recipes]
        }
    