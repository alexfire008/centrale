
from flasgger import swag_from
from flask.json import jsonify
from flask_restful import Resource
from flask_restful.reqparse import Argument

from repositories import PredictionRepository
from util import parse_params



class PredictionResource(Resource):
    """ Verbs relative to the notes """

    @staticmethod
    @swag_from("../swagger/prediction/GET.yml")
    def get(user_first_name,user_last_name):
        """ Return the average note of a film """
        Prediction = PredictionRepository.get(user_first_name=user_first_name,user_last_name=user_last_name)
        return jsonify({"predictions": Prediction})