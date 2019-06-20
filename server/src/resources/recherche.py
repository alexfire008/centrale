
from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import RechercheRepository
from util import parse_params



class RechercheResource(Resource):
    """ Verbs relative to the notes """

    @staticmethod
    @swag_from("../swagger/recherche/GET.yml")
    def get(research):
        """ Return the films with the research in the title """
        recherche = RechercheRepository.get(research=research)
        return jsonify({"research": recherche })