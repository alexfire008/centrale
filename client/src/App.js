import React from 'react';
import logo from './Logo.png';
import './App.css';

const film1={title :'Star Wars épisode 4 : Un Nouvel Espoir',date:1977};
const film2={title :'Indiana Jones : Les aventuriers de l\'Arche Perdue',date:1981}
const film3={title :'2012',date:2009}

const films=[film1,film2,film3]

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Find and note your movies !
        </p>
        <p>
          {films.map(film=>{return<div>{film.title}, sorti en {film.date}</div>})}
        </p>
        <a
          className="App-link"
          href="https://static.wamiz.fr/images/articles/facebook/article/chaton-fb-59413483eb29f.jpg"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
