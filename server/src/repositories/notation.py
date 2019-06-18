""" Defines the User repository """

from models import Notation


class NotationRepository:
    """ The repository for the notation model """

    @staticmethod
    def get(user_first_name, user_last_name, movie_title):
        """ Query a user by last and first name and movie title """
        return Notation.query.filter_by(user_last_name=user_last_name, user_first_name=user_first_name, movie_title=movie_title).one()

    def update(self, user_first_name, user_last_name, movie_title, note):
        """ Update a note """
        notation = self.get(user_last_name, user_first_name, movie_title)
        notation.note = note

        return notation.save()

    @staticmethod
    def create(user_first_name, user_last_name, movie_title, note):
        """ Create a new note """
        notation = Notation(user_last_name=user_last_name, user_first_name=user_first_name,  movie_title=movie_title, note=note)

        return notation.save()
