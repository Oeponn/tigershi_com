import React from "react";
import { Link } from "react-router-dom";

const Testbutton = () => {
    const refreshResults = () => {
        console.log("refreshed")
        fetch("/api/temp/")
        .then((resp) => {
            // console.warn(resp)
            console.log("Response:", resp)
            return resp.json()
          })
          .then(json => {
              console.log(json)
            // console.warn(resp)
          })
        // fetch("/api/mercari/")
        // .then((resp) => {
        //     console.log("Response:", resp)

        //     return resp.json()
        // })
        // .then((json) => {
        //     console.log(json)
        // })
      }

      return (
        <button onClick={() => refreshResults()}>REFRESH</button>
      )
}

export default function Account() {
  return (
      <div className="account-container">
          <p><Link to='/' className='blacklink'> Go Home</Link></p>
          <Testbutton />
          {/* <br /> */}
      </div>
  )
}