from flask_sqlalchemy import SQLAlchemy
from .db import db


class Like(db.Model):
    __tablename__ = "likes"
    id = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "number": self.number,
            "user_id": self.user_id,
            "recipe_id": self.recipe_id
        }