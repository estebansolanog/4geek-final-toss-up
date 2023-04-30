from flask_sqlalchemy import SQLAlchemy
from .db import db

recipe_ingredient = db.Table('recipe_ingredient',
    db.Column('id_recipe', db.Integer, db.ForeignKey('recipe.id_recipe')),
    db.Column('id_ingredient', db.Integer, db.ForeignKey('ingredient.id_ingredient'))
)

class Recipe(db.Model):
    id_recipe = db.Column(db.Integer, primary_key=True)
    name_recipe = db.Column(db.String(120), unique=True, nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), unique=True, nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)
    id_country = db.Column(db.Integer, db.ForeignKey('country.id_country'), nullable=False)
    id_category = db.Column(db.Integer, db.ForeignKey('category.id_category'), nullable=False)
    likes = db.relationship('Like', backref='recipe', lazy=True)
    
    # Relación muchos-a-muchos con Ingredient
    ingredients = db.relationship('Ingredient', secondary=recipe_ingredient, lazy='subquery',
        backref=db.backref('recipes', lazy=True))
    
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
            "ingredients": [ingredient.serialize() for ingredient in self.ingredients]
        }
    

class Ingredient(db.Model):
    id_ingredient = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    
    def serialize(self):
        return {
            "id_ingredient": self.id_ingredient,
            "name": self.name,
            "recipes": [recipe.serialize() for recipe in self.recipes]
        }