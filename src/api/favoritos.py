from flask_sqlalchemy import SQLAlchemy
from .db import db

class Favorito(db.Model):
    __tablename__="favorito"
    id = db.Column(db.Integer, primary_key=True)
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    

    def serialize(self):
        return {
            "id": self.id,
            "id_recipe": self.id_recipe
        }
    
"""  id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False) """
"""   "id_user": self.id_user, """