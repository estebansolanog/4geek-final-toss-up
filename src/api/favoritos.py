from flask_sqlalchemy import SQLAlchemy
from .db import db

class Favorito(db.Model):
    __tablename__="favorito"
    id = db.Column(db.Integer, primary_key=True)
    recipe_id = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)


    def serialize(self):
        return {
            "id": self.id,
            "recipe_id": self.recipe_id,
            "user_id" : self.user_id
        }
    
"""  id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False) """
"""   "id_user": self.id_user, """