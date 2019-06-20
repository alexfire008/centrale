""" Defines the User repository """

from models import Notation
from models import Film
from models import db

from sqlalchemy import func

class RechercheRepository:
    """The repository for the notation average truc"""
    @staticmethod
    def get(research):
        films=db.session.query(Film.title).all()
        recherche=[]
        for film in films :
            if research in film[0]:
                avg=db.session.query(func.avg(Notation.note)).filter_by(movie_title=film[0]).group_by(Notation.movie_title).one()
                recherche.append([(film,avg)])
        L=[]
        for i in recherche :
            l=[i[0][0][0],float(i[0][1][0])]
            L.append(l)
        return L
