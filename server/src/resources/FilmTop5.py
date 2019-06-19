
from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import FilmTop5Repository
from util import parse_params



class FilmTop5Resource(Resource):
    """ Verbs relative to the notes """

    @staticmethod
    @swag_from("../swagger/FilmTop5/GET.yml")
    def get():
        """ Return the average note of a film """
        FilmTop5 = FilmTop5Repository.get()
        FilmTop=[]
        for i in FilmTop5 :
            film=(i[0],float(i[1]))
            FilmTop.append(film)
        return jsonify({"notation": {"movies": FilmTop}})