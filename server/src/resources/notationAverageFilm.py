
from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import NotationAverageFilmRepository
from util import parse_params



class NotationAverageFilmResource(Resource):
    """ Verbs relative to the notes """

    @staticmethod
    @swag_from("../swagger/notationAverageFilm/GET.yml")
    def get(movie_title):
        """ Return the average note of a film """
        notationAverage = NotationAverageFilmRepository.get(movie_title=movie_title)
        return jsonify({"notation": {"movie": notationAverage[0], "average":float(notationAverage[1])}})