from flask_sqlalchemy import SQLAlchemy
from .db import db
from .countries import Country
from .categories import Category
from .favoritos import Favorito
# from .likes import Likes
# from .recipe_ingredient import Recipe_ingredient


class Recipe(db.Model):
    __tablename__="recipes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), unique=False, nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)
    
    id_country = db.Column(db.Integer, db.ForeignKey('country.id_country'), nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('category.id_category'), nullable=False)

    id_likes = db.Column(db.Integer, db.ForeignKey('likes.id_likes'), nullable=False)
    id_favorito = db.Column(db.Integer, db.ForeignKey('favorito.id_favorito'), nullable=False)

    # Relación muchos-a-muchos con Ingredient
    # id_ingredient = db.relationship('Ingredient', secondary=Recipe_ingredient, lazy='subquery',backref=db.backref('recipe', lazy=True))
    recipe_ingredient = db.relationship('Recipe_ingredient', backref="recipe", lazy=True)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
            "difficulty": self.difficulty,
            "calories": self.calories,
            "description": self.description,
            "instructions": self.instructions,
            "id_country": self.id_country,
            "id_category": self.id_category,
            "id_likes": len(self.id_likes),
            "id_favorito": self.id_favorito,
            "id_ingredient": [ingredient.serialize() for ingredient in self.ingredients]
        }
