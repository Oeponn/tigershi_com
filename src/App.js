import React, { Component, useState } from 'react';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import logo from './images/react_atom.svg';
import './css/App.css';
import './css/Cursor.css';
import './css/Home.css';
import './css/Feed.css';

import Home from './components/Home';
import Feed from './components/oponn_feed';
import Curation from './components/Curation';
import Store from './components/Store';
import Login from './components/Login';
import Logout from './components/Logout';
import PageNotFound from './components/404';

import Cursor from './components/cursor';
import { addCursorFeatureClick } from './components/cursorhelpers';

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

const Header = (props) => {
  return (
    <header className='header'>
      <h1>Oponn</h1>
      <div>
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
      <hr className='line'/>
    </header>
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
    document.getElementsByClassName('App-logo')[0].addEventListener('click',()=>{console.log("CLICKED")})
  }


  render () {
    return (
      <div className="god-container">
        <BrowserRouter>
        <Header loggedIn={this.state.loggedIn}/>
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
            <p class="home-inspo">
              This website was built in reactjs by Tiger Shi ©2021
            </p>
            {/* <CounterComponent /> */}
          </header>
        </div>
      </div>
    );
  }
}


// export default App;
