import React, {useEffect} from "react";

export default function Login(props) {
  useEffect(() => {
    console.log("Login Mounted")

    return(() => {
      console.log("Login Unmounted")
    })
  });

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
        console.log("Response:", resp.ok)
        props.isLoggedIn(resp.ok)

        return resp
      });
  }

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
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
        


        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}