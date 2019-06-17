""" Defines the Film repository """

from models import film


class FilmRepository:
    """ The repository for the film model """

    @staticmethod
    def get(title):
        """ Query a film by title """
        return film.query.filter_by(title=title).one()

    def update(self, title, date):
        """ Update a user's age """
        film = self.get(title)
        film.date = date

        return film.save()

    @staticmethod
    def create(title, date):
        """ Create a new user """
        film = film(title=title, date=date)

        return film.save()
