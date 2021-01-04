import React, { Component, useState } from 'react';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import logo from './images/logo.svg';
// import logo from './Rei_Bike_Shorts.png'
import './App.css';

import Home from './components/Home';
import InstagramFeed from './components/InstagramFeed';
import Curation from './components/Curation';
import Store from './components/Store';
import PageNotFound from './components/404';
import Cursor from './components/cursor';

const CounterComponent = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      Click the button below to see the number go up: {count}
      <br />
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
      <div>
      <NavLink to="/" exact={true} activeClassName='selected-link' className='header-links home'>Home</NavLink>
      <NavLink to="/instagramfeed" activeClassName='selected-link' className='header-links'>Feed</NavLink>
      <NavLink to="/curation" activeClassName='selected-link' className='header-links'>Curation</NavLink>
      <NavLink to="/store" activeClassName='selected-link' className='header-links'>Store</NavLink>
      {/* <Cursor /> */}
      </div>
      <hr className='line'/>
    </header>
  )
}

const Content = () => {
  return (
    <div>
      <BrowserRouter>
      <Header />
      <Cursor />
        <div>
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
          <CounterComponent />
        </header>
      </div>
    </div>
  );
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      cart: {},
      products: [],
    };
  }

  componentDidMount() {
    const parent = document.getElementsByClassName("inner")

    const cursor = document.getElementsByClassName("cursor")[0];

    Array.prototype.forEach.call(parent, child => {
      child.addEventListener("mouseenter", () => {
        cursor.classList.add("invert")
      });
      child.addEventListener("mouseleave", () => {
        cursor.classList.remove("invert")
      });
    });
  }


  render() {
    return (
      <div>
      <Content />
      </div>
    )
  }
}

// export default App;
