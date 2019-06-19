""" Defines the User repository """

from models import Notation

from models import db

from sqlalchemy import func

class NotationAverageFilmRepository:
    """The repository for the notation average truc"""
    @staticmethod
    def get(user_first_name,user_last_name):
        def similarites(user1_first_name,user1_last_name,user2_first_name,user2_last_name)
        return db.session.query(Notation.movie_title, func.avg(Notation.note)).group_by(Notation.movie_title).order_by(func.avg(Notation.note).desc()).limit(5).all()
