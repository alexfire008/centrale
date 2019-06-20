""" Defines the User repository """

from models import Notation

from models import db

from sqlalchemy import func

class FilmNotesRepository:
    """The repository for the notation average truc"""
    @staticmethod
    def get(user_first_name,user_last_name):
        return db.session.query(Notation.movie_title).filter_by(user_first_name=user_first_name).filter_by(user_last_name=user_last_name).all()
