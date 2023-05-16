from flask_sqlalchemy import SQLAlchemy
from .db import db


class Ingredient(db.Model):
    __tablename__="ingredients"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)
    recipe_ingredients = db.relationship('RecipeIngredient', backref="ingredients", lazy=True)

    def __repr__(self):
        return f"<Ingredient {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "recipe_ingredients": [recipe_ingredient.id for recipe_ingredient in self.recipe_ingredients]
        }
    

    
