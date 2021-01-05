import React from "react";
import { Link } from "react-router-dom";

export default function Curation() {
  return (
      <div className='container-main'>
        <div className='inner'>
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

          <p>404 Page not found</p>
          <p><Link to='/' className='whitelink'> Go back to home</Link></p>
          

        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
        </div>
      </div>
  )
}