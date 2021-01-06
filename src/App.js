import React, { Component, useState } from 'react';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import logo from './images/react_atom.svg';
import './App.css';

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
  }


  render () {
    return (
      <div>
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
}


// export default App;
