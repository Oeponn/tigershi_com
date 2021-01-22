import React from "react";
import { Link } from "react-router-dom";
import stupidCat from '../images/pagenotfound_cat.png';

export default function Curation() {
  return (
      <div className='container-main'>
        <div className='inner'>
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

          <p>404 PAGE NOT FOUND</p>
          <img class="full-width" src={stupidCat} alt="stupid confused cat"/>
          <p><Link to='/' className='whitelink'> Go back home</Link></p>

          

        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
        </div>
      </div>
  )
}