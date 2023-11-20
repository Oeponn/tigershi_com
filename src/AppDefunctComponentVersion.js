import React, {Component} from 'react';
import {Switch, Route, BrowserRouter} from 'react-router-dom';
import './css/App.scss';
import './css/Account.css';
import './css/Curation.css';
import './css/Feed.css';
import './css/LoginCreate.css';

import Account from './components/Account';
import CreateAccount from './components/CreateAccount';
import Login from './components/Login';
import Logout from './components/Logout';

import {
  Cursor,
  Footer,
  Header,
  Home,
} from './components/global';

import PageNotFound from './components/pages/PageNotFound';

// const ifLoggedIn = async () => {
//   const response = await fetch('/api/loggedin/')
//       .then((resp) => {
//         return resp.json();
//       })
//       .then((json) => {
//       // console.log(json["response"])
//         return json['response'];
//       });
//   return response;
// };

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      check: '',
      user: '',
      admin: false,
    };
  }

  // componentDidMount() {
  //   console.log("App Mounted")
  //   this.setState({
  //     check: await ifLoggedIn(),
  //   },
  //     () => {
  //       this.changeLoginStatus(this.state.check["logged_in"])
  //     })
  //   addCursorFeatureClick();
  //   document.getElementsByClassName('App-logo')[0].addEventListener('click', () => { console.log('CLICKED') });
  // }

  // changeLoginStatus = (loggedIn) => {
  //   console.log('User logged in: ' + loggedIn)
  //   this.setState({
  //     loggedIn
  //   }, () => {
  //     if (this.state.loggedIn) {
  //       this.setState({
  //         headerItems: "header-links"
  //       })
  //     }
  //     else {
  //       this.setState({
  //         headerItems: "header-links collapse"
  //       })
  //     }
  //   })
  // }

  render() {
    return (
      <div className="appContainer">
        <Cursor />
        <BrowserRouter>
          <Header loggedIn={this.state.loggedIn} headerItems={this.state.headerItems} handleCartOpen={this.handleCartOpen} />
          <div>
            <Switch>
              <Route path="/" component={Home} exact={true} />
              {/* <Route path="/feed" component={Feed} /> */}
              {/* <Route path="/curation" render={() => <Curation loggedIn={this.state.loggedIn} history={this.props.history} />} /> */}
              <Route path="/createaccount" component={CreateAccount} />
              <Route path="/login" render={() => <Login changeLoginStatus={this.changeLoginStatus} />} />
              <Route path="/account" component={Account} />
              <Route path="/logout" render={() => <Logout changeLoginStatus={this.changeLoginStatus} history={this.props.history} meme="gigfty" />} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>

        <Footer loggedIn={this.state.loggedIn} />
      </div>
    );
  }
}

export default App;
