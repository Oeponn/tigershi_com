import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route, Link, BrowserRouter, NavLink } from "react-router-dom";
import logo from './logo.svg';
import './App.css';

import Home from './components/Home';
import InstagramFeed from './components/InstagramFeed';
import Curation from './components/Curation';
import PageNotFound from './components/404'

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Hello Guv {count}
      <br />
      <button onClick={() => setCount(count => {
        console.log("Hullo", count)
        return (count + 1)
      })}>Click</button>
    </div>
  );
}

const Header = () => {
  return (
    <header>
      <h1>Oponn</h1>
      <NavLink to="/" exact={true} activeClassName='selected-link' className='header-links home'>Home</NavLink>
      <NavLink to="/instagramfeed" activeClassName='selected-link' className='header-links'>InstagramFeed</NavLink>
      <NavLink to="/curation" activeClassName='selected-link' className='header-links'>Curation</NavLink>
    </header>
  )
}




const App = () => {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/instagramfeed" component={InstagramFeed} />
            <Route path="/curation" component={Curation} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      <div className="App">
        <header className="App-header">
          <CounterComponent />
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
    </div>
  );
}

export default App;
