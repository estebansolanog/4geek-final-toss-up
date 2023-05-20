from flask_sqlalchemy import SQLAlchemy
from .db import db

from .countries import Country
from .categories import Category
from .user import User


class Recipe(db.Model):
    __tablename__="recipes"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=False, nullable=False)
    time = db.Column(db.Integer, nullable=True)
    difficulty = db.Column(db.String(120), unique=False, nullable=False)
    calories = db.Column(db.Integer, nullable=True)
    description = db.Column(db.String(80), unique=False, nullable=False)
    instructions = db.Column(db.String(120), unique=True, nullable=False)
    
    country_id = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
    # user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  
    
    likes = db.relationship('Like', backref='recipes', lazy=True)
    recipe_ingredients = db.relationship('RecipeIngredient', backref="recipes", lazy=True)
    favorites = db.relationship('Favorito', backref="recipes", lazy=True)
    coments = db.relationship('Coment', backref="recipes", lazy=True)
    

    def __repr__(self):
        return f"<Recipe {self.id}>"
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "time": self.time,
            "difficulty": self.difficulty,
            "calories": self.calories,
            "description": self.description,
            "instructions": self.instructions,
            "country_id": self.country_id,
            "category_id": self.category_id,
            "likes": len(self.likes),
            "recipe_ingredients": [recipe_ingredient.serialize() for recipe_ingredient in self.recipe_ingredients],
            "favorites": len(self.favorites),
            "coments": len(self.coments)
        }

# from flask_sqlalchemy import SQLAlchemy
# from .db import db
# from .countries import Country
# from .categories import Category
# from .favoritos import Favorito
# from .recipe_ingredient import RecipeIngredient
# # from .likes import Likes
# # from .recipe_ingredient import Recipe_ingredient


# class Recipe(db.Model):
#     __tablename__="recipes"
#     id = db.Column(db.Integer, primary_key=True)
#     name = db.Column(db.String(120), unique=False, nullable=False)
#     time = db.Column(db.Integer, nullable=True)
#     difficulty = db.Column(db.String(120), unique=False, nullable=False)
#     calories = db.Column(db.Integer, nullable=True)
#     description = db.Column(db.String(80), unique=False, nullable=False)
#     instructions = db.Column(db.String(120), unique=True, nullable=False)
    
#     id_country = db.Column(db.Integer, db.ForeignKey('countries.id'), nullable=False)
#     id_category = db.Column(db.Integer, db.ForeignKey('categories.id'), nullable=False)
#     id_likes = db.Column(db.Integer, db.ForeignKey('likes.id'), nullable=False)
#     id_favorito = db.Column(db.Integer, db.ForeignKey('favorito.id'), nullable=False)

#     # Relación muchos-a-muchos con Ingredient
#     # id_ingredient = db.relationship('Ingredient', secondary=Recipe_ingredient, lazy='subquery',backref=db.backref('recipe', lazy=True))
#     recipe_ingredient = db.relationship('RecipeIngredient', backref="recipe", lazy=True)

#     def serialize(self):
#         return {
#             "id": self.id,
#             "name": self.name,
#             "time": self.time,
#             "difficulty": self.difficulty,
#             "calories": self.calories,
#             "description": self.description,
#             "instructions": self.instructions,
#             "id_country": self.id_country,
#             "id_category": self.id_category,
#             "id_likes": len(self.id_likes),
#             "id_favorito": self.id_favorito,
#             "id_ingredient": [ingredient.serialize() for ingredient in self.ingredients]
#         }
