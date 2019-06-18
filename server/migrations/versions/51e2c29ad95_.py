""" create the User table

Revision ID: 51e2c29ad95
Revises: 4f2e2c180af
Create Date: 2016-10-02 16:00:01.042947

"""

from alembic import op
import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = '51e2c29ad95'
down_revision = '4f2e2c180af'


def upgrade():
    op.create_table(
        'user',
        sa.Column('first_name', sa.String(length=300), nullable=False),
        sa.Column('last_name', sa.String(length=300), nullable=False),
        sa.Column('age', sa.Integer(), nullable=False),
        sa.PrimaryKeyConstraint('first_name', 'last_name')
    )
    op.create_table(
        'film',
        sa.Column('title', sa.String(length=300), nullable=False),
        sa.Column('date', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('title')
    )
    op.create_table(
        'notation',
        sa.Column('movie_title', sa.String(length=300), sa.ForeignKey('film.title'), nullable=False),
        sa.Column('user_first_name', sa.String(length=300), nullable=False),
        sa.Column('user_last_name', sa.String(length=300), nullable=False),
        sa.Column('note', sa.Integer(), nullable=True),
        sa.PrimaryKeyConstraint('movie_title', 'user_first_name', 'user_last_name'),
		sa.ForeignKeyConstraint(['user_first_name', 'user_last_name'], ['user.first_name', 'user.last_name'])
    )


def downgrade():
    op.drop_table('notation')
    op.drop_table('user')
    op.drop_table('film')
