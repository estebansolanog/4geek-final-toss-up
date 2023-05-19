from flask_sqlalchemy import SQLAlchemy
from .db import db

from .user import User
from .recipe import Recipe


class Favorite(db.Model):
    __tablename__="favorites"
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def __repr__(self):
        return f"<Favorite {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }
