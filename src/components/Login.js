import React, { useEffect, Route, BrowserRouter, NavLink as NavLink} from "react";

export default function Login() {
  useEffect(() => {
    console.log("Login Mounted")

    return (() => {
      console.log("Login Unmounted")
    })
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(e)
    const data = {
      "username": "admin",
      "password": "password"
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
        console.log("Response:", resp.text())

        return resp
      });
  }

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

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
          <label htmlFor="username">username:</label><br />
          <input type="text" id="username" name="username" /><br />
          <label htmlFor="password">password:</label><br />
          <input type="password" id="password" name="password" />
          <br />
          <br />
          <div>
            <button>Enter</button>
          </div>
        </form>


        <div>
          come here
        </div>


        {/* <div>
          <NavLink to="/store" activeClassName='selected-link' className='header-links'>Store</NavLink>
        </div> */}



        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
  )
}