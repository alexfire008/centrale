"""
Define the REST verbs relative to the users
"""

from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import NotationRepository
from util import parse_params


class NotationResource(Resource):
    """ Verbs relative to the notes """

    @staticmethod
    @swag_from("../swagger/notation/GET.yml")
    def get(user_last_name, user_first_name,movie_title):
        """ Return a notation key information based on user's name and title """
        notation = NotationRepository.get(user_last_name=user_last_name, user_first_name=user_first_name, movie_title=movie_title)
        return jsonify({"notation": notation.json})

    @staticmethod
    @parse_params(
        Argument("note", location="json", required=True, help="The note given to the movie.")
    )
    @swag_from("../swagger/notation/POST.yml")
    def post(user_last_name, user_first_name, movie_title, note):
        """ Create a notation based on the sent information """
        notation = NotationRepository.create(
            user_last_name=user_last_name, user_first_name=user_first_name, movie_title=movie_title, note=note
        )
        return jsonify({"notation": notation.json})

    @staticmethod
    @parse_params(
        Argument("note", location="json", required=True, help="The note given to the movie.")
    )
    @swag_from("../swagger/notation/PUT.yml")
    def put(user_last_name, user_first_name, movie_title, note):
        """ Update a notation based on the sent information """
        repository = NotationRepository()
        notation = repository.update(user_last_name=user_last_name, user_first_name=user_first_name, movie_title=movie_title, note=note)
        return jsonify({"notation": notation.json})
