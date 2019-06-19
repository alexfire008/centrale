import React from 'react';
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";




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
	return (
		<div className="Home">
		{research()}

			<div className="recommendations">
				<div className="movies">
					<h2 className="title">meilleurs films</h2>
					{movie("Star Wars 12", 7.5)}
					{movie("Harry Potter 9", 9.2)}
					{movie("Star Wars 12", 7.5)}
					{movie("Harry Potter 9", 9.2)}
					{movie("Star Wars 12", 7.5)}
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
	
	return (
		<div className="movieApp">
			<div className="header">
				<div className="title">{match.params.title}</div>
				<div className="note"> 9.75</div>
			</div>
				<div className="date">2573</div>
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
			<div className="movieNote"> {avgNote} </div>
		</Link>
	)
}

function loading() {
	return (
		<div> chargement en cours</div>
	)
}

export default App;
