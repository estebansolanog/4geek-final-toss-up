from flask_sqlalchemy import SQLAlchemy
from .db import db

class Favorito(db.Model):
    __tablename__="favoritos"
    id_favorito = db.Column(db.Integer, primary_key=True)
    id_user = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    id_recipe = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    def serialize(self):
        return {
            "id_favorito": self.id_favorito,
            "id_user": self.id_user,
            "id_recipe": self.id_recipe,
        }


# from flask_sqlalchemy import SQLAlchemy
# from .db import db

# class Favorito(db.Model):
#     __tablename__="favorito"
#     id = db.Column(db.Integer, primary_key=True)
#     id_recipe = db.Column(db.Integer, db.ForeignKey('recipes.id'), nullable=False)

    

#     def serialize(self):
#         return {
#             "id": self.id,
#             "id_recipe": self.id_recipe
#         }
    
# """  id_user = db.Column(db.Integer, db.ForeignKey('user.id_user'), nullable=False) """
# """   "id_user": self.id_user, """