import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Hello Guv {count}
      <br/>
      <button onClick={()=> setCount(count => {
        console.log("Hullo", count)
        return (count + 1)
        })}>Click</button>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <CounterComponent/>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
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
