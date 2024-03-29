import React, {useEffect} from "react";
import { useHistory } from 'react-router-dom';

export default function Logout(props) {
  useEffect(() => {
    console.log("Login Mounted")

    return(() => {
      console.log("Login Unmounted")
    })
  });

  function Exit() {
    let history = useHistory();
  
    function handleClick() {
      fetch("/api/logout/", {
          method: 'GET', // *GET, POST, PUT, DELETE, etc.
          credentials: 'same-origin',
          headers: {
            'Content-Type': 'application/json'
          },
        })
      .then((resp) => {
          console.log("Response:", resp.ok)
          props.changeLoginStatus(false)
          history.push('/')
        });
    }
  
    return (
      <button type="button" onClick={handleClick}>
        Exit
      </button>
    );
  }

  

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
        <br />

        <div>
          <Exit />
        </div>

        <div>
            you are leaving me?
        </div>
        
        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}