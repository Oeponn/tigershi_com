import {Link} from 'react-router-dom';

const Testbutton = () => {
  const refreshResults = () => {
    console.log('refreshed');
    fetch('/api/loggedin/')
        .then((resp) => {
        // console.warn(resp)
        // console.log("Response:", resp)
          return resp.json();
        })
        .then((json) => {
          console.log(json['response']);
        // console.warn(resp)
        });
    // fetch("/api/login/", {
    //   method: 'POST', // *GET, POST, PUT, DELETE, etc.
    //   credentials: 'same-origin',
    //   headers: {
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify({"username": "admin", "password": "password"})
    // })
    // .then(response => {
    //   console.log(response.bodyUsed)
    //   var res = response.blob()
    //   console.log(response.bodyUsed)
    //   console.log(res)
    // })
  };

  return (
    <button onClick={() => refreshResults()}>REFRESH</button>
  );
};

export default function Account() {
  return (
    <div className="account-container">
      <p><Link to='/' className='blacklink'> Go Home</Link></p>
      <Testbutton />
      {/* <br /> */}
    </div>
  );
}
