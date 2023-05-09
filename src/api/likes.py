from flask_sqlalchemy import SQLAlchemy
from .db import db


class Likes(db.Model):
    id_likes = db.Column(db.Integer, primary_key=True)
    number = db.Column(db.Integer, nullable=False)
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), nullable=False)
    # id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)
    def __repr__(self):
        return f"<Likes {self.id_likes}>"
    