import React, {useEffect} from "react";
import Feed from "./Feed.js"

export default function InstagramFeed() {
  useEffect(() => {
    console.log("Instagram Mounted")

    return(() => {
      console.log("Instagram Unmounted")
    })
  });

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
        <p>oponn_'s instagram feed</p>
        <div>
          
        <Feed userName="oponn_" className="Feed" classNameLoading="Loading" limit="4"/>
        </div>

        <div>
          <button>Load More...</button>
        </div>
        


        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}