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


import {isTouchDevice} from './components/shared/helpers.tsx';
const touchScreen = isTouchDevice();


const App = () => {
  return (
    <div className="appContainer">
      <Cursor touchScreen={touchScreen} />
      <BrowserRouter>
        <Header loggedIn={false} />
        <div className="pageContainer">
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/art" component={Art} exact={true} />
            <Route path="/createaccount" component={CreateAccount} />
            <Route
              path="/login"
              render={() => <Login changeLoginStatus={() => {}} />}
            />
            <Route path="/account" component={Account} />
            <Route
              path="/logout"
              render={() =><Logout changeLoginStatus={() => {}} />}
            />
            <Route path="/:name" component={PageNotFound} />
          </Switch>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
