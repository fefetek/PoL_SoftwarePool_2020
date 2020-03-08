import React from 'react';
import logo from './heart.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to <code>P.o.L</code> the dating site that proves that love exists.
        </p>
        <a
          className="App-link"
          href="localhost:2020"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find your PoL ->
        </a>
      </header>
    </div>
  );
}

export default App;
