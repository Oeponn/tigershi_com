import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import logo from './images/react_atom.svg';
import './css/App.css';
import './css/Cursor.css';
import './css/Home.css';
import './css/Feed.css';
import './css/Curation.css';

import Home from './components/Home';
import Feed from './components/oponn_feed';
import Curation from './components/Curation';
import Store from './components/Store';
import Login from './components/Login';
import Logout from './components/Logout';
import PageNotFound from './components/404';

import Cursor from './components/cursor';
import { addCursorFeatureClick } from './components/cursorhelpers';

const Header = (props) => {
  return (
    <div className='header-container'>
      <h1>Oponn</h1>
      <div className="header-links-container">
        <NavLink to="/" exact={true} activeClassName='selected-link' className='header-links home'>Home</NavLink>
        <NavLink to="/feed" activeClassName='selected-link' className='header-links'>Feed</NavLink>
        <NavLink to="/curation" activeClassName='selected-link' className='header-links'>Curation</NavLink>
        <NavLink to="/store" activeClassName='selected-link' className='header-links'>Store</NavLink>
        {
          props.loggedIn ?
            <NavLink to="/logout" activeClassName='selected-link' className='header-links'>Exit</NavLink>
            :
            <NavLink to="/login" activeClassName='selected-link' className='header-links'>Enter</NavLink>
        }
      </div>
      <div className="line-container">
        <hr className='line-black' />
      </div>
    </div>
  )
}

const Footer = (props) => {
  return (
    <div className='footer-container'>
      <div className="footer-line-container">
        <hr className='line-black' />
      </div>
      <div className="footer-links-container">
        <a className="blacklink" href="https://www.linkedin.com/in/tiger-shi/" rel="noreferrer" target="_blank">LinkedIn</a>
        <a className="blacklink" href="https://github.com/Oeponn/" rel="noreferrer" target="_blank">Github</a>
        <a className="blacklink" href="https://www.instagram.com/oponn_/" rel="noreferrer" target="_blank">Instagram</a>
      </div>
    </div>
  )
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      cart: {},
      products: [],
    };
  }

  componentDidMount() {
    console.log("App Mounted")
    console.log("Logged in: ", this.state.loggedIn)
    addCursorFeatureClick()
    document.getElementsByClassName('App-logo')[0].addEventListener('click', () => { console.log("CLICKED") })
  }


  render() {
    return (
      <div className="god-container">
        <BrowserRouter>
          <div className="headerc-container">
            <Header loggedIn={this.state.loggedIn} />
          </div>
          <Cursor />
          <div>
            <Switch>
              <Route path="/" component={Home} exact={true} />
              <Route path="/feed" component={Feed} />
              <Route path="/curation" component={Curation} />
              <Route path="/store" component={Store} />
              <Route path="/login" component={Login} />
              <Route path="/logout" component={Logout} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>

        <div className="App">
          <header className="App-header">
            <div className="App-logo-container">
              <img src={logo} className="App-logo unselectable" alt="logo" />
            </div>
            <p className="home-inspo">
              This website was built in reactjs by Tiger Shi ©2021
            </p>
          </header>
        </div>

        <Footer loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}


// export default App;
