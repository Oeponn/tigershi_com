import React, {useEffect} from "react";

export default function Logout(props) {
  useEffect(() => {
    console.log("Login Mounted")

    return(() => {
      console.log("Login Unmounted")
    })
  });

  const handleClick = () => {
    
    fetch("/api/logout/", {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json'
        },
      })
    .then((resp) => {
        console.log("Response:", resp.ok)
        props.isLoggedIn(false)

        return resp
      });
  }

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
        <br />
        <div>
            <button onClick={handleClick}>Exit</button>
        </div>

        <div>
            you are leaving?
        </div>
        


        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}