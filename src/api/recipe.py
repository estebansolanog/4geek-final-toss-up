from flask_sqlalchemy import SQLAlchemy
from .db import db
from .ingredient import Ingredient
from .countries import Country
from .categories import Category
from .likes import Likes


class Recipe(db.Model):
    id_recipe = db.Column(db.Integer, primary_key=True)
    name_recipe = db.Column(db.String(120), unique=True, nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), unique=True, nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)
    id_country = db.Column(db.Integer, db.ForeignKey('country.id_country'), nullable=False)
    country = db.relationship('Country', backref='recipes', lazy=True)
    ingredients = db.relationship('Ingredient', secondary=recipe_ingredient, backref=db.backref('recipes', lazy=True))
    id_category = db.Column(db.Integer, db.ForeignKey('category.id_category'), nullable=False)
    category = db.relationship('Category', backref='recipes', lazy=True)
    likes = db.relationship('Like', backref='recipe', lazy=True)

    def serialize(self):
        return {
            "id_recipe": self.id_recipe,
            "name_recipe": self.name_recipe,
            "time": self.time,
            "difficulty": self.difficulty,
            "calories": self.calories,
            "description": self.description,
            "instructions": self.instructions,
            "country": self.country.name_country,
            "ingredients": [ingredient.name for ingredient in self.ingredients],
            "category": self.category.name_category,
            "likes": len(self.likes),
        }