import React, { useState, lazy, Suspense } from 'react';
import { Switch, Route, Link, BrowserRouter, NavLink } from "react-router-dom";
import logo from './logo.svg';
// import logo from './Rei_Bike_Shorts.png'
import './App.css';

import Home from './components/Home';
import InstagramFeed from './components/InstagramFeed';
import Curation from './components/Curation';
import Store from './components/Store';
import PageNotFound from './components/404'

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Click this to see the number go up: {count}
      <br />
      <button onClick={() => setCount(count => {
        // console.log("Hullo", count)
        return (count + 1)
      })}>I have too much time on my hands</button>
    </div>
  );
}

const Header = () => {
  return (
    <header className='header'>
      <h1>Oponn</h1>
      <NavLink to="/" exact={true} activeClassName='selected-link' className='header-links home'>Home</NavLink>
      <NavLink to="/instagramfeed" activeClassName='selected-link' className='header-links'>Feed</NavLink>
      <NavLink to="/curation" activeClassName='selected-link' className='header-links'>Curation</NavLink>
      <NavLink to="/store" activeClassName='selected-link' className='header-links'>Store</NavLink>
      <hr className='line'/>
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
            <Route path="/store" component={Store} />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            This website was built in react
          </p>
          {/* <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
            >
            Learn React
          </a> */}
        </header>
          <CounterComponent />
      </div>
    </div>
  );
}

export default App;
