import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';

export default function Login(props) {

  useEffect(() => {
    
    // console.log("Login Mounted")
    return (() => {
      // console.log("Login Unmounted")
    })
  });



  const LoginButton = () => {
    let history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        "username": e.target[0].value,
        "password": e.target[1].value
      }
      fetch("/api/login/", {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then((resp) => {
          return resp.json()
        }).then(response => {
          response = response["response"]
          if (response["logged_in"] === true) {
            console.log("logged in type:", response["login_type"])
            props.changeLoginStatus(response["logged_in"])
            history.push('/account')
          }
          else {
            alert("who are you?")
          }
        });
    }


    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">username:</label><br />
        <input type="text" id="username" name="username" /><br />
        <label htmlFor="password">password:</label><br />
        <input type="password" id="password" name="password" />
        <br />
        <br />
        <div>
          <button className="login-button">enter</button>
        </div>
      </form>
    );
  }

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

        <LoginButton />
        {/* <div>
          <NavLink to="/createaccount"><button className="login-button">create an account</button></NavLink>
        </div> */}



        <div className="left corner">⌊</div>
        <div className="right corner">⌋</div>
      </div>
    </div>
  )
}