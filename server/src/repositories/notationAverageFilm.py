""" Defines the User repository """

from models import Notation

from models import db

from sqlalchemy import func

class NotationAverageFilmRepository:
    """The repository for the notation average truc"""
    @staticmethod
    def get(movie_title):
        return db.session.query(Notation.movie_title, func.avg(Notation.note)).filter_by(movie_title=movie_title).group_by(Notation.movie_title).one()
