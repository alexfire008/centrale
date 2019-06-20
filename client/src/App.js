import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import superagent from 'superagent';


const userContext = React.createContext(null);

function App() {
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [age, setAge] = React.useState(0);
	
	const [user, setUser] = React.useState(null);

	const [inscription, setInscription] = React.useState(false);///TODO
	
	return (
		user == null?
			
			!inscription?
				<div className="connect">
					<div className="connectText">first name : </div>
					<input className="connectField" type="text" onChange={(event) => setFirstName(event.target.value)}/>
					<div className="connectText">last name : </div>
					<input className="connectField" type="text" onChange={(event) => setLastName(event.target.value)}/>
					<button className="connectButton" onClick={() => 
					{
						superagent.get("http://localhost:5000/application/user/"+lastName+"/"+firstName).then((response) => setUser(response.body.user))	
					}
				}>connexion</button>
					<button className="inscriptionProposal" onClick={() => setInscription(true)}>inscription</button>
				</div>
			:<div className="connect">
				<div className="connectText">first name : </div>
				<input className="connectField" type="text" onChange={(event) => setFirstName(event.target.value)}/>
				<div className="connectText">last name : </div>
				<input className="connectField" type="text" onChange={(event) => setLastName(event.target.value)}/>
				<div className="connectText">age : </div>
				<input className="connectField" type="number" onChange={(event) => setAge(event.target.value)}/>
				<button className="connectButton" onClick={() => 
					{
						superagent.post("http://localhost:5000/application/user/"+lastName+"/"+firstName).send({age:age}).then((response) => setUser(response.body.user))	
					}
				}>inscription</button>
					<button className="inscriptionProposal" onClick={() => setInscription(false)}>connexion</button>
			</div>
		:
		<userContext.Provider value={user}>
			<Router>
				<div className="header">
					<Link to="/" >home</Link>
					<Link to="/" onClick={() => setUser(null)}> disconnect</Link>
					<Link to="/user/"> your profile</Link>
				</div>
				<div className="App">
					<Route exact path="/" component={Home} />
					<Route path="/movie/:title" component={Movie} />
					
				</div>
			</Router>
		</userContext.Provider>
	);
}

function Home() {
	const [bestMovies, setBestMovies] = React.useState(null)
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/FilmTop5/")
		.then(response => {
			setBestMovies(response.body.notation.movies)
	})}, []);


	return (
		<div className="Home">
		{research()}

			<div className="recommendations">
				<div className="movies">
					<h2 className="title">meilleurs films</h2>
					{bestMovies != null ? (
						<div>
						{movie(bestMovies[0][0], bestMovies[0][1])}
						{movie(bestMovies[1][0], bestMovies[1][1])}
						{movie(bestMovies[2][0], bestMovies[2][1])}
						{movie(bestMovies[3][0], bestMovies[3][1])}
						{movie(bestMovies[4][0], bestMovies[4][1])}
						</div>
					):(loading())}
				</div>


				<div className="movies">
					<h2 className="title">nos recommendations</h2>
					{movie("Star Wars 12", 7.5)}
					{movie("Harry Potter 9", 9.2)}
					{movie("Star Wars 12", 7.5)}
					{movie("Harry Potter 9", 9.2)}
					{movie("Star Wars 12", 7.5)}
				</div>
			</div>
		</div>
	)
}

function Movie({ match }) {
	const user = React.useContext(userContext);
	
	const [movieData, setMovieData] = React.useState("");
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/film/"+match.params.title)
		.then(response => {
			setMovieData(response.body.film)
	})}, []);
	const [averageNote, setAverageNote] = React.useState("");
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/notationAverageFilm/"+match.params.title)
		.then(response => 
			setAverageNote((response.body.notation.average+"").substring(0, 3))
	)}, []);
	const [userNote, setUserNote] = React.useState(null);
	const [newUserNote, setNewUserNote] = React.useState("");
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/notation/"+user.last_name+"/"+user.first_name+"/"+match.params.title).then(
			response => {
				setUserNote(response.body.notation.note)
				setNewUserNote(response.body.notation.note | "")
				console.log(user)
			}
		)}, []);
	
	return (
		<div className="movieApp">
			<div className="header">
				<div className="title">{movieData.title}</div>
				<div className="note"> {averageNote}</div>
			</div>
				<div className="date">{movieData.date}</div>
				<div className="yourNote">
				<div> votre note : </div>
				<input className="noteInput" value={newUserNote} onChange={(event) => setNewUserNote(event.target.value)} type="number" min="0" max="10"/>
				<button onClick={
					() => {
							(userNote != null?
							superagent.put("http://localhost:5000/application/notation/"+user.last_name+"/"+user.first_name+"/"+match.params.title).send({note: newUserNote})
							:superagent.post("http://localhost:5000/application/notation/"+user.last_name+"/"+user.first_name+"/"+match.params.title).send({note: newUserNote})).then( (response) => {
							superagent.get("http://localhost:5000/application/notationAverageFilm/"+match.params.title)
								.then(response => 
									setAverageNote((response.body.notation.average+"").substring(0, 3)));
							})
								
	
					}
				}> Valider </button>
			</div>
		</div>
	);
}

function research() {
	return (
		<div className="research">
			<input type="text"/>
			<button>rechercher</button>
		</div>
	)
}

function movie(title, avgNote) {
	return (
		<Link to={"/movie/"+title} className="movie">
			<div className="movieTitle"> {title} </div>
			<div className="movieNote"> {(avgNote+"").substring(0, 3)} </div>
		</Link>
	)
}

function loading() {
	return (
		<div> chargement en cours</div>
	)
}

export default App;
