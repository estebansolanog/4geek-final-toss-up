from flask_sqlalchemy import SQLAlchemy
from .db import db


class Ingredient(db.Model):
    id_ingredient = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), unique=True, nullable=False)


    def serialize(self):
        return {
            "id_ingredient": self.id_ingredient,
            "name": self.name,
        }