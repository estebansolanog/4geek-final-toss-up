"""empty message

Revision ID: 29da1b2c0f85
Revises: 
Create Date: 2023-05-20 07:05:41.521205

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '29da1b2c0f85'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('favorito')
    op.drop_table('favorites')
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.drop_column('share')
        batch_op.drop_column('image_of_recipe')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_of_recipe', mysql.VARCHAR(length=512), nullable=True))
        batch_op.add_column(sa.Column('share', mysql.TINYINT(display_width=1), autoincrement=False, nullable=False))

    op.create_table('favorites',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('user_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.Column('recipe_id', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['recipe_id'], ['recipes.id'], name='favorites_ibfk_2'),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], name='favorites_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    op.create_table('favorito',
    sa.Column('id', mysql.INTEGER(), autoincrement=True, nullable=False),
    sa.Column('id_recipe', mysql.INTEGER(), autoincrement=False, nullable=False),
    sa.ForeignKeyConstraint(['id_recipe'], ['recipes.id'], name='favorito_ibfk_1'),
    sa.PrimaryKeyConstraint('id'),
    mysql_collate='utf8mb4_0900_ai_ci',
    mysql_default_charset='utf8mb4',
    mysql_engine='InnoDB'
    )
    # ### end Alembic commands ###