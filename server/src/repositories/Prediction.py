""" Defines the User repository """

from models import Notation

from models import db

from sqlalchemy import func

class PredictionRepository:
    """The repository for the notation average truc"""
    @staticmethod
    def get(user_first_name,user_last_name):
        def similarities(user1_first_name,user1_last_name,user2_first_name,user2_last_name):
            avg1=float(db.session.query(func.avg(Notation.note)).group_by(Notation.user_last_name).group_by(Notation.user_first_name).filter_by(user_last_name=user1_last_name).all()[0][0])
            avg2=float(db.session.query(func.avg(Notation.note)).group_by(Notation.user_last_name).group_by(Notation.user_first_name).filter_by(user_last_name=user2_last_name).all()[0][0])
            films1=db.session.query(Notation.movie_title, Notation.note).filter_by(user_first_name=user1_first_name).filter_by(user_last_name=user1_last_name).all()
            films2=db.session.query(Notation.movie_title, Notation.note).filter_by(user_first_name=user2_first_name).filter_by(user_last_name=user2_last_name).all()
            somme=0
            norme1=0
            norme2=0
            for i in range(len(films1)):
                norme1+=(films1[i][1]-avg1)**2
                for j in range(len(films2)):
                    if films1[i][0]==films2[j][0]:
                        somme+=(films1[i][1]-avg1)*(films2[j][1]-avg2)
            for j in range(len(films2)):
                norme2+=(films2[j][1]-avg2)**2
            return somme/((norme1*norme2)**(1/2))
        S=[[i[0],i[1],similarities(user_first_name,user_last_name,i[0],i[1])] for i in db.session.query(Notation.user_first_name,Notation.user_last_name).group_by(Notation.user_first_name).group_by(Notation.user_last_name).all()]
        films=db.session.query(Notation.movie_title).group_by(Notation.movie_title).all()
        filmsnote=db.session.query(Notation.movie_title).filter_by(user_first_name=user_first_name).filter_by(user_last_name=user_last_name).all()
        avg=float(db.session.query(func.avg(Notation.note)).group_by(Notation.user_last_name).group_by(Notation.user_first_name).filter_by(user_last_name=user_last_name).all()[0][0])
        Sim=sorted(S,key= lambda x: x[2],reverse=True)
        predicateurs=[]
        for film in films :
            if film not in filmsnote : 
                prediction=film
                note=avg
                norme=0
                for i in range(1,max(2,len(Sim)//10)):
                    films2=db.session.query(Notation.movie_title).filter_by(user_first_name=Sim[i][0]).filter_by(user_last_name=Sim[i][1]).all()
                    filmsnote2=db.session.query(Notation.movie_title,Notation.note).filter_by(user_first_name=Sim[i][0]).filter_by(user_last_name=Sim[i][1]).all()
                    avg2=float(db.session.query(func.avg(Notation.note)).group_by(Notation.user_last_name).group_by(Notation.user_first_name).filter_by(user_last_name=Sim[i][1]).all()[0][0])
                    if prediction in films2:
                        note+=Sim[i][2]*(filmsnote2[films2.index(prediction)][1]-avg2)
                        norme+=abs(Sim[i][2])
                avgfilm=float(db.session.query(func.avg(Notation.note)).group_by(Notation.movie_title).filter_by(movie_title=film[0]).all()[0][0])
                predicateurs.append([prediction,avgfilm,note])
        sortpred=sorted(predicateurs, key=lambda x:x[2],reverse=True)
        L=[]
        for i in range(min(len(sortpred),5)):
            L.append(sortpred[i])
        return L