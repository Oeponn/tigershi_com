import React, {useEffect} from "react";
import {addInvertListeners} from './cursorhelpers'

export default function Home() {
  useEffect(() => {
    console.log("Home Mounted")
    addInvertListeners()

    return(() => {
      console.log("Home Unmounted")
    })
  });

  return (
  <div className="container-main">
    <div className="inner">
      <div className="upper left corners">⌈</div>
      <div className="upper right corners">⌉</div>


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


      <div className="bottom left corners">⌊</div>
      <div className="bottom right corners">⌋</div>
    </div>
  </div>
  )
}
