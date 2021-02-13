import React from "react";
import { Link } from "react-router-dom";
import stupidCat from '../images/pagenotfound_cat.png';

export default function Account() {
  return (
      <div className="account-container">
          <p><Link to='/' className='blacklink'> Go Home</Link></p>
          {/* <br /> */}
      </div>
  )
}