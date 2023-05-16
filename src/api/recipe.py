from flask_sqlalchemy import SQLAlchemy
from .db import db
# from .ingredient import Ingredient
from .countries import Country
from .categories import Category
# from .likes import Likes
# from .recipe_ingredient import Recipe_ingredient


class Recipe(db.Model):
    __tablename__="recipe"
    id_recipe = db.Column(db.Integer, primary_key=True)
    name_recipe = db.Column(db.String(120), unique=True, nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), unique=False, nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)
    id_country = db.Column(db.Integer, db.ForeignKey('country.id_country'), nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('category.id_category'), nullable=False)
    id_likes = db.relationship('Likes', backref='recipe', lazy=True)
    id_favoritos = db.Column(db.Integer, db.ForeignKey('recipe.id_favoritos'), nullable=False)

    # Relación muchos-a-muchos con Ingredient
    # id_ingredient = db.relationship('Ingredient', secondary=Recipe_ingredient, lazy='subquery',backref=db.backref('recipe', lazy=True))
    recipe_ingredient = db.relationship('Recipe_ingredient', backref="recipe", lazy=True)
    

    def serialize(self):
        return {
            "id_recipe": self.id_recipe,
            "name_recipe": self.name_recipe,
            "time": self.time,
            "difficulty": self.difficulty,
            "calories": self.calories,
            "description": self.description,
            "instructions": self.instructions,
            "id_country": self.id_country,
            "id_category": self.id_category,
            "likes": len(self.likes),
            "id_ingredient": [ingredient.serialize() for ingredient in self.ingredients]
        }