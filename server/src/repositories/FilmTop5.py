""" Defines the User repository """

from models import Notation

from models import db

from sqlalchemy import func

class FilmTop5Repository:
    """The repository for the notation average truc"""
    @staticmethod
    def get():
        return db.session.query(Notation.movie_title, func.avg(Notation.note)).group_by(Notation.movie_title).order_by(func.avg(Notation.note).desc()).limit(5).all()
