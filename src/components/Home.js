import React, {useEffect} from "react";
// import {addInvertListeners} from './cursorhelpers'
import lain_x6 from '../images/lain_x6.png';

export default function Home() {
  useEffect(() => {
    console.log("Home Mounted")

    return(() => {
      console.log("Home Unmounted")
    })
  });

  return (
  <div className="container-main">
    <div className="inner">
      <div className="upper left corners">⌈</div>
      <div className="upper right corners">⌉</div>

      <p>____</p>
      <p>You might know me as oponn_</p>
      <p>My name is Tiger</p>
      <p>This is my website</p>


      <div className="bottom left corners">⌊</div>
      <div className="bottom right corners">⌋</div>
    </div>
      
    <div className="inner">
    <div className="upper left corners">⌈</div>
      <div className="upper right corners">⌉</div>


      <p>NOISE</p>
      <div>
        <img src={lain_x6} className="full-width" />
      </div>
      


      <div className="bottom left corners">⌊</div>
      <div className="bottom right corners">⌋</div>
    </div>
  </div>
  )
}
