import React, {useEffect} from "react";

export default function Login() {
  useEffect(() => {
    console.log("Login Mounted")

    return(() => {
      console.log("Login Unmounted")
    })
  });

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
        <form>
            <label for="username">username:</label><br />
            <input type="text" id="username" name="username" /><br />
            <label for="password">password:</label><br />
            <input type="password" id="password" name="password" />
        </form>
        <br />
        <div>
            <button>Enter</button>
        </div>

        <div>
            come here
        </div>
        


        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}