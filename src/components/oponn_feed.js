import React, {useEffect} from "react";
import Feed from "./Feed.js"
import Media from "./Media"

export default function InstagramFeed() {
  useEffect(() => {
    console.log("Instagram Mounted")

    return(() => {
      console.log("Instagram Unmounted")
    })
  });

  const showFeed = false;
  const media = 
  [
    {alt: "worm bag", url: "https://www.instagram.com/p/CJE13rfgNcI", src: "https://instagram.fdet1-1.fna.fbcdn.net/v/t51.2885…1&oh=9e436c1b3152159e713a459c658d05b4&oe=601EBE6B"},
    {alt: "leg tumors", url: "https://www.instagram.com/p/CIWlboYA41c", src: "https://instagram.fdet1-2.fna.fbcdn.net/v/t51.2885…1&oh=ed272e5dcd2df384c87554c1300cf4e7&oe=601E00F4"},
    {alt: "⬛️🤝🟥", url: "https://www.instagram.com/p/CGlnXNRAU9E", src: "https://instagram.fdet1-1.fna.fbcdn.net/v/t51.2885…1&oh=fabc6932d6a572b97ba1dddd8a546aa3&oe=60201A5A"},
    {alt: "“man fuck summer it’s way too hot to do anything”↵- resident man in mountain jacket", src: "https://instagram.fdet1-1.fna.fbcdn.net/v/t51.2885-15/sh0.08/e35/s640x640/120276032_655896628672765_3129735195712643722_n.jpg?_nc_ht=instagram.fdet1-1.fna.fbcdn.net&_nc_cat=101&_nc_ohc=kO-DVX7wSFsAX-BK2vL&tp=1&oh=28239b3b78b37be51cd169e9fa338ed2&oe=601D785F", url: "https://www.instagram.com/p/CFxK8xogAHR"},
  ] 

  return (
    <div className="container-main">
      <div className="inner">
        <div className="upper left corners">⌈</div>
        <div className="upper right corners">⌉</div>

        <p>____</p>
        <p>oponn_'s instagram feed</p>

        {showFeed ?

        <div>
        <p>now showing last four posts:</p>
        <Feed userName="oponn_" className="Feed" classNameLoading="Loading" limit="4"/>
        </div>
        :
        <div>
          <div>【=◈︿◈=】</div>
          <div>STATUS: OFFLINE</div>
          <br />
          <div>you have reached your daily instagram allowance, please pay social credits to continue viewing</div>
          <br />
          <div>instagram enforces a limit to the daily number of public accesses you can make to their system</div>
          <br />

          
          

          {/* <div className="Feed">
            {media.map((media, index) => (
              <Media key={index} src={media.src} url={media.url} alt={media.alt} />
            ))}
          </div> */}

        </div>

        }

        {/* <div>
          <button>Load More...</button>
        </div> */}
        


        <div className="bottom left corners">⌊</div>
        <div className="bottom right corners">⌋</div>
      </div>
    </div>
    )
}