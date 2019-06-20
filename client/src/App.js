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

	const [inscription, setInscription] = React.useState(false);
	
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
				}>connect</button>
					<button className="inscriptionProposal" onClick={() => setInscription(true)}>sign in</button>
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
				}>sign in</button>
					<button className="inscriptionProposal" onClick={() => setInscription(false)}>connect</button>
			</div>
		:
		<userContext.Provider value={user}>
			<Router>
				<div className="header">
					<Link to="/" >home</Link>
					<Link to="/" onClick={() => setUser(null)}> sign out</Link>
					<Link to="/user/"> your profile</Link>
				</div>
				<div className="App">
					<Route exact path="/" component={Home} />
					<Route path="/user" component={User} />
					<Route path="/search/:search" component={Research} />
					<Route path="/movie/:title" component={Movie} />
					
				</div>
			</Router>
		</userContext.Provider>
	);
}

function User({ match }) {
	const user = React.useContext(userContext);
	const [movies, setMovies] = React.useState(null);
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/FilmNotes/" +user.first_name+"/"+user.last_name)
		.then(response => {
			setMovies(response.body.movies)
	})}, []);
	
	return (
		<div className="User">
			<div className="accountData">
				<div className="userData"> 
					<div className="userField">first name : </div>
					<div className="userValue"> {user.first_name}  </div>
				</div>
				<div className="userData"> 
					<div className="userField">last name : </div>
					<div className="userValue"> {user.last_name}  </div>
				</div>
				<div className="userData">
					<div className="userField">age : </div>
					<div className="userValue"> {user.age} </div>
				</div>
			</div>
			<div className="movies">
				<h2 className="title">notes</h2>
				{
				movies != null?
					movies.map((val, index) => movie(val[0], val[1], index)):loading()}
			</div>
		</div>
	);
	
}

function Home() {
	const user = React.useContext(userContext);

	const [bestMovies, setBestMovies] = React.useState(null)
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/FilmTop5/")
		.then(response => {
			setBestMovies(response.body.notation.movies)
	})}, []);
	const [recommendations, setRecommendations] = React.useState(null)
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/prediction/" + user.last_name + "/" + user.first_name)
		.then(response => {
			setRecommendations(response.body.predictions)
	})}, []);
	const [search, setSearch] = React.useState("");


	return (
		<div className="Home">
			<div className="research">
				<input type="text" onChange={(event) => setSearch(event.target.value)}/>
				<Link to={"/search/" + search}>search</Link>
			</div>

			<div className="recommendations">
				<div className="movies">
					<h2 className="title">best movies</h2>
					{bestMovies != null ? (
						<div>
						{bestMovies.map((val, index) => movie(val[0], val[1], index))}
						</div>
					):(loading())}
				</div>


				<div className="movies">
					<h2 className="title">Just for you</h2>
					{recommendations != null ? (
						<div>
						{recommendations.map((val, index) => movie(val[0], val[1], index))}
						</div>
					):(loading())}
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

function Research({ match }) {
	const [currentSearch, setCurrentSearch] = React.useState(match.params.search);
	const [search, setSearch] = React.useState(match.params.search);
	const [result, setResult] = React.useState(null);
	React.useEffect(() => {
		superagent.get("http://localhost:5000/application/recherche/"+currentSearch)
		.then(response => {
			setResult(response.body.research)
	})}, []);
	
	return (
		<div>
			<div className="research">
				<input type="text" value={search} onChange={(event) => setSearch(event.target.value)}/>
				<Link to={"/search/" + search} onClick={() => {
					superagent.get("http://localhost:5000/application/recherche/"+search)
					.then(response => {
						setResult(response.body.research)})
					setCurrentSearch(search)
					
				}}>search</Link>
			</div>
			<div className="movies">
				{
					result == null?loading():
					result.map((val, index) => movie(val[0], val[1], index))
				}
			</div>
		</div>
	)
}

function movie(title, avgNote, key=null) {
	return (
		<Link to={"/movie/"+title} className="movie" key={key}>
			<div className="movieTitle"> {title} </div>
			<div className="movieNote"> {(avgNote+"").substring(0, 3)} </div>
		</Link>
	)
}

function loading() {
	return (
		<div>oouetq</div>
	)
}

export default App;
