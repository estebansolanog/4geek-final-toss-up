  
import os
from flask_admin import Admin
from .favoritos import Favorito
from .ingredient import Ingredient
from .countries import Country
from .categories import Category
from .recipe import Recipe
from .likes import Likes
from .user import User, TokenBlokedList
from .recipe_ingredient import Recipe_ingredient
# from .favoritos import Favorito
# from .ingredient import Ingredient
# from .countries import Country
# from .categories import Category
from api.db import db
from .modelsChat import db, User, RecipeChat
from .favoritos import Favorito
from flask_admin.contrib.sqla import ModelView



from flask_admin.menu import MenuCategory, MenuView, MenuLink

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
    admin = Admin(app, name='4Geeks Admin', template_mode='bootstrap3')

    
    # Add your models here, for example this is how we add a the User model to the admin
    admin.add_view(ModelView(User, db.session))
    admin.add_view(ModelView(Favorito, db.session))
    admin.add_view(ModelView(Ingredient, db.session))
    admin.add_view(ModelView(Country, db.session))
    admin.add_view(ModelView(Category, db.session))
    admin.add_view(ModelView(RecipeChat, db.session))
    admin.add_view(ModelView(Recipe, db.session))
    admin.add_view(ModelView(Likes, db.session))
    admin.add_view(ModelView(TokenBlokedList, db.session))


    # You can duplicate that line to add mew models
    # admin.add_view(ModelView(YourModelName, db.session))
    admin.add_link(MenuLink(name='Home Page Backend', url='/'))