import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import superagent from 'superagent';



function App() {
	return (
	<Router>
		<div className="App">
			<Route exact path="/" component={Home} />
			<Route path="/movie/:title" component={Movie} />

		</div>
	</Router>
	);
}

function Home() {
	const [bestMovies, setBestMovies] = React.useState(null)
	React.useEffect(() => {
		superagent.get("http://127.0.0.1:5000/application/FilmTop5/")
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
	const [movieData, setMovieData] = React.useState("");
	const [averageNote, setAverageNote] = React.useState("");
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/film/"+match.params.title)
		.then(response => {
			setMovieData(response.body.film)
	})}, []);
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/notationAverageFilm/"+match.params.title)
		.then(response => {
			setAverageNote((response.body.notation.average+"").substring(0, 3))
	})}, []);
	
	
	return (
		<div className="movieApp">
			<div className="header">
				<div className="title">{movieData.title}</div>
				<div className="note"> {averageNote}</div>
			</div>
				<div className="date">{movieData.date}</div>
			<div className="yourNote">
				<div> votre note : </div>
				<input className="noteInput" type="number" min="0" max="10"/>
				<button> Valider </button>
			</div>
		</div>
	)
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
