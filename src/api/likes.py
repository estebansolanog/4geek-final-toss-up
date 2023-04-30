from flask_sqlalchemy import SQLAlchemy
from .db import db


class Likes(db.Model):
    id_likes = db.Column(db.Integer, primary_key=True)
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), nullable=False)
    id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False)
    number = db.Column(db.Integer, nullable=False)
    recipe = db.relationship('Recipe', backref=db.backref('likes', lazy=True))
    user = db.relationship('User', backref=db.backref('likes', lazy=True))

    def __repr__(self):
        return f"<Likes {self.id_likes}>"