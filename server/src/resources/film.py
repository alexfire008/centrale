"""
Define the REST verbs relative to the films
"""

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import FilmRepository
from util import parse_params


class FilmResource(Resource):
    """ Verbs relative to the films """

    @staticmethod
    @swag_from("../swagger/film/GET.yml")
    def get(title):
        """ Return a film key information based on its title """
        film = FilmRepository.get(title=title)
        return jsonify({"film": film.json})

    @staticmethod
    @parse_params(
        Argument("date", location="json", required=True, help="The date of the film.")
    )
    @swag_from("../swagger/film/POST.yml")
    def post(title, date):
        """ Create a film based on the sent information """
        film = FilmRepository.create(
            title = title, date = date
        )
        return jsonify({"film": film.json})

    @staticmethod
    @parse_params(
        Argument("date", location="json", required=True, help="The date of the film.")
    )
    @swag_from("../swagger/film/PUT.yml")
    def put(title,date):
        """ Update a film based on the sent information """
        repository = FilmRepository()
        film = repository.update(title=title,date=date)
        return jsonify({"film": film.json})