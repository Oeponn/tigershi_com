import React, {useEffect} from "react";

export default function Logout() {
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
        <br />
        <div>
            <button>Exit</button>
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