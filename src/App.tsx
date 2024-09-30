import {Routes, Route, BrowserRouter} from 'react-router-dom';

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
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/art" element={<Art />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route
              path="/login"
              element={<Login changeLoginStatus={() => {}} />}
            />
            <Route path="/account" element={<Account />} />
            <Route
              path="/logout"
              element={<Logout changeLoginStatus={() => {}} />}
            />
            <Route path="/:name" element={<PageNotFound />} />
          </Routes>
        </div>
      </BrowserRouter>

      <Footer />
    </div>
  );
};

export default App;
