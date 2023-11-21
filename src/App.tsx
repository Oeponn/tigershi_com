import React, {useEffect, useState} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';

import Account from './components/Account';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Logout from './components/Logout';

import {
  Cursor,
  Footer,
  Header,
} from './components/global';
import {
  Art,
  Home,
  PageNotFound,
} from './components/pages';

import './css/App.scss';
import './css/Account.css';


import {isTouchDevice} from './components/shared/helpers';
const touchScreen = isTouchDevice();


const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch('/api/loggedin/')
        .then((resp) => {
          return resp.json();
        })
        .then((json) => {
          const {response: {logged_in: isLoggedIn}} = json;
          setLoggedIn(isLoggedIn);
        });
  }, []);

  useEffect(() => {
    if (loggedIn) {
      console.log('loggedIn useEffect:', loggedIn);
    }
  }, [loggedIn]);

  return (
    <div className="appContainer">
      <Cursor touchScreen={touchScreen} />
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <div className="pageContainer">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/art" component={Art} exact={true} />
            <Route path="/createaccount" component={CreateAccount} />
            <Route
              path="/login"
              render={() => <Login changeLoginStatus={setLoggedIn} />}
            />
            <Route path="/account" component={Account} />
            <Route
              path="/logout"
              render={() =><Logout changeLoginStatus={setLoggedIn} />}
            />
            <Route component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
