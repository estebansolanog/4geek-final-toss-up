from flask_sqlalchemy import SQLAlchemy
from .db import db

class Favorito(db.Model):
    __tablename__="favorito"
    id_favorito = db.Column(db.Integer, primary_key=True)
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipe.id_recipe'), nullable=False)

    

    def serialize(self):
        return {
            "id_favorito": self.id_favorito,
            "id_recipe": self.id_recipe
        }
    
"""  id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False) """
"""   "id_user": self.id_user, """