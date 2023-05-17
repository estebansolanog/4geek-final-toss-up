from flask_sqlalchemy import SQLAlchemy
from .db import db

from .user import User
from .recipe import Recipe


class Coment(db.Model):
    __tablename__="coments"
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(120), unique=True, nullable=False)
    
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def __repr__(self):
        return f"<Coment {self.id}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }
    