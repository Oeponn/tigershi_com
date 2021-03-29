import React, { Component } from 'react';
import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";
import logo from './images/react_atom.svg';
import './css/App.css';
import './css/Account.css'
import './css/Curation.css';
import './css/Cursor.css';
import './css/Feed.css';
import './css/Home.css';
import './css/LoginCreate.css'
import './css/Store.css';

import Account from './components/Account';
import CreateAccount from './components/CreateAccount';
import Curation from './components/Curation';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import PageNotFound from './components/404';
import Store from './components/Oponn_Store';

import Cursor from './components/cursor';
import { addCursorFeatureClick } from './components/cursorhelpers';

// Shopify Section
import Cart from './components/shopify/Cart';
import { connect } from 'react-redux';
import store from './store';

const Header = (props) => {
  return (
    <div className='header-container'>
      <h1 className="header-oponn">Oponn</h1>
      <div className="header-links-container">
        <NavLink to="/" exact={true} activeClassName='selected-link' className={props.header_items}>Home</NavLink>
        <NavLink to="/curation" activeClassName='selected-link' className={props.header_items}>Curation</NavLink>
        {
          props.loggedIn ?
            <NavLink to="/account" activeClassName='selected-link' className={props.header_items}>Account</NavLink>
            :
            null
        }
        <NavLink to="/store" activeClassName='selected-link' className={props.header_items}>Store</NavLink>
        {
          props.loggedIn ?
            <NavLink to="/logout" activeClassName='selected-link' className={props.header_items}>Exit</NavLink>
            :
            <NavLink to="/login" activeClassName='selected-link' className={props.header_items}>Enter</NavLink>
        }
      </div>
      {/* <button onClick={() => {props.handleCartOpen()}} className={props.header_items}>Shopify Cart</button> */}
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
        <a className="blacklink footer-links" href="https://www.linkedin.com/in/tiger-shi/" rel="noreferrer" target="_blank">LinkedIn</a>
        <a className="blacklink footer-links" href="https://github.com/Oeponn/" rel="noreferrer" target="_blank">Github</a>
        <a className="blacklink footer-links" href="https://www.instagram.com/oponn_/" rel="noreferrer" target="_blank">Instagram</a>
      </div>
    </div>
  )
}

const ifLoggedIn = async () => {
  const response = await fetch("/api/loggedin/")
    .then((resp) => {
      return resp.json()
    })
    .then(json => {
      // console.log(json["response"])
      return json["response"]
    })
  return response
}


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      check: "",
      user: "",
      admin: false,
      header_items: "header-links collapse",
      cart: {},
      products: [],
    };

    this.updateQuantityInCart = this.updateQuantityInCart.bind(this);
    this.removeLineItemInCart = this.removeLineItemInCart.bind(this);
    this.handleCartClose = this.handleCartClose.bind(this);
    this.handleCartOpen = this.handleCartOpen.bind(this);
  }

  async componentDidMount() {
    // console.log(await ifLoggedIn())
    console.log("App Mounted")
    this.setState({
      check: await ifLoggedIn(),
    },
      () => {
        this.changeLoginStatus(this.state.check["logged_in"])
      })
    // console.log(this.state.check)
    // console.log(this.state.loggedIn)
    addCursorFeatureClick()
    document.getElementsByClassName('App-logo')[0].addEventListener('click', () => { console.log("CLICKED") })
  }

  changeLoginStatus = (loggedIn) => {
    console.log('User logged in: ' + loggedIn)
    this.setState({
      loggedIn
    }, () => {
      if (this.state.loggedIn) {
        this.setState({
          header_items: "header-links"
        })
      }
      else {
        this.setState({
          header_items: "header-links collapse"
        })
      }
    })
  }
  updateQuantityInCart(lineItemId, quantity) {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id
    const lineItemsToUpdate = [{id: lineItemId, quantity: parseInt(quantity, 10)}]
    state.client.checkout.updateLineItems(checkoutId, lineItemsToUpdate).then(res => {
      store.dispatch({type: 'UPDATE_QUANTITY_IN_CART', payload: {checkout: res}});
    });
  }
  removeLineItemInCart(lineItemId) {
    const state = store.getState(); // state from redux store
    const checkoutId = state.checkout.id
    state.client.checkout.removeLineItems(checkoutId, [lineItemId]).then(res => {
      store.dispatch({type: 'REMOVE_LINE_ITEM_IN_CART', payload: {checkout: res}});
    });
  }
  handleCartClose() {
    store.dispatch({type: 'CLOSE_CART'});
  }
  handleCartOpen() {
    store.dispatch({type: 'OPEN_CART'});
  }

  render() {
    const state = store.getState(); // state from redux store
    // console.log(this.props.history)
    return (
      <div className="god-container">
        <button onClick={() => { 
          this.handleCartOpen() 
          console.log("OPENED")
        }}>Shopify Cart</button>

        <BrowserRouter>
          <div className="headerc-container">
            <Header loggedIn={this.state.loggedIn} header_items={this.state.header_items} handleCartOpen={this.handleCartOpen} />
          </div>
          <Cursor />
          <div>
            <Switch>
              <Route path="/" component={Home} exact={true} />
              {/* <Route path="/feed" component={Feed} /> */}
              <Route path="/curation" render={() => <Curation loggedIn={this.state.loggedIn} history={this.props.history} />} />
              <Route path="/store" component={Store} />
              <Route path="/createaccount" component={CreateAccount} />
              <Route path="/login" render={() => <Login changeLoginStatus={this.changeLoginStatus} />} />
              <Route path="/account" component={Account} />
              <Route path="/logout" render={() => <Logout changeLoginStatus={this.changeLoginStatus} history={this.props.history} meme="gigfty" />} />
              <Route component={PageNotFound} />
            </Switch>
          </div>
        </BrowserRouter>

        {/* <div>
          <button onClick={() => { console.log(this.props.history) }}> Yas </button>
        </div> */}

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
        <Cart
          checkout={state.checkout}
          isCartOpen={state.isCartOpen}
          handleCartClose={this.handleCartClose}
          updateQuantityInCart={this.updateQuantityInCart}
          removeLineItemInCart={this.removeLineItemInCart}
        />
      </div>
    );
  }
}


// export default App;
export default connect((state) => state)(App);