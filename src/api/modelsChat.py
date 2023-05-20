from flask_sqlalchemy import SQLAlchemy
from .db import db
from .user import User

class RecipeChat(db.Model):
    __tablename__="recipe_chat"
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120), unique=False, nullable=True)
    description=db.Column(db.String(6144), unique=False, nullable=False)
    user_query=db.Column(db.String(280), unique=False, nullable=False)
    image_of_recipe=db.Column(db.String(512), unique=False, nullable=True)

    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    
    def __repr__(self):
        return f'<RecipeChat {self.description}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "user_id": self.user_id,
            "user_query": self.user_query,
            "image_of_recipe": self.image_of_recipe
        }
        