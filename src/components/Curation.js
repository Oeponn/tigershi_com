import React, {useEffect} from "react";

export default function Curation() {
  useEffect(() => {
    console.log("Curation Mounted")
  });

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left">⌈</div>
        <div className="upper right">⌉</div>
  
  
        <div>Curation Page</div>
        <div>Amazing</div>
  
  
        <div className="bottom left">⌊</div>
        <div className="bottom right">⌋</div>
      </div>
        
      <div className="inner">
        <p>NOISE</p>
      </div>
    </div>
    )
}