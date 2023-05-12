from flask_sqlalchemy import SQLAlchemy
from .db import db
from .user import User

class RecipeChat(db.Model):
    __tablename__="recipe_chat"
    id=db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(120), unique=True, nullable=True)
    description=db.Column(db.String(6144), unique=False, nullable=False)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id_user'))
    user_query=db.Column(db.String(280), nullable=False)

    def __repr__(self):
        return f'<RecipeChat {self.description}>'
    
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }