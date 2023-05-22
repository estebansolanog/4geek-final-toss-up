from flask_sqlalchemy import SQLAlchemy
from .db import db


class Recipe(db.Model):
    __tablename__ = "recipes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)

    id_country = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    id_likes = db.Column(db.Integer, db.ForeignKey('likes.id'), nullable=False)

    recipe_ingredients = db.relationship('RecipeIngredient', backref="recipe", lazy=True)

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
            "id_likes": self.id_likes,
            "recipe_ingredients": [ri.serialize() for ri in self.recipe_ingredients]
        }