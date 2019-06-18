"""
Define the User model
"""
from . import db
from .abc import BaseModel, MetaBaseModel


class Notation(db.Model, BaseModel, metaclass=MetaBaseModel):
    """ The User model """

    __tablename__ = "notation"

    user_first_name = db.Column(db.String(300), primary_key=True)
    user_last_name = db.Column(db.String(300), primary_key=True)
    movie_title = db.Column(db.String(300), primary_key=True)
    note = db.Column(db.Integer)

    def __init__(self, user_first_name, user_last_name, movie_title, note):
        """ Create a new note """
        self.user_first_name = user_first_name
        self.user_last_name = user_last_name
        self.movie_title = movie_title
        self.note = note
