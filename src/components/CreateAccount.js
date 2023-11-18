import React, {useEffect} from 'react';
// import { Switch, Route, BrowserRouter, NavLink } from "react-router-dom";

export default function Login() {
  useEffect(() => {
    console.log('Login Mounted');

    return (() => {
      console.log('Login Unmounted');
    });
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    const data = {
      'username': 'admin',
      'password': 'password',
    };
    fetch('/api/login/', {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
        .then((resp) => {
          console.log('Response:', resp.text());

          return resp;
        });
  };

  return (
    <div className="container-main">
      <div className="inner">
        <div className="left corner">⌈</div>
        <div className="right corner">⌉</div>

        <div className="pulse-container">
          ║<span className="fade-3 pulse">I</span>
          <span className="fade-2 pulse">H</span>
          <span className="fade-1 pulse">E</span>
          <span className="fade-0 pulse">L</span>
          <span className="fade-1 pulse">L</span>
          <span className="fade-2 pulse">O</span>
          <span className="fade-3 pulse">I</span>║
        </div>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="create-form-container">
            {/* <label htmlFor="username">first:</label><br /> */}
            <input type="text" id="username" name="username" className="create-form-item" placeholder="first name" /><br />

            {/* <label htmlFor="username">last:</label><br /> */}
            <input type="text" id="username" name="username" className="create-form-item" placeholder="last name" /><br />

            <label htmlFor="username">username:</label><br />
            <input type="text" id="username" name="username" className="create-form-item" /><br />

            <label htmlFor="password">password:</label><br />
            <input type="password" id="password" name="password" className="create-form-item" /><br />

            <label htmlFor="password">confirm password:</label><br />
            <input type="password" id="password" name="password" className="create-form-item" /><br />

            <label htmlFor="password">email:</label><br />
            <input type="email" id="email" name="email" className="create-form-item" /><br />
          </div>

          <br />
          <br />
          <div>
            <button className="login-button">create account</button>
          </div>
        </form>
        {/* <div>
          <NavLink to="/createaccount"><button className="login-button">create an account</button></NavLink>
        </div> */}

        <div className="left corner">⌊</div>
        <div className="right corner">⌋</div>
      </div>
    </div>
  );
}
