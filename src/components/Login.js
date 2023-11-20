import React, {useEffect} from 'react';
import Card from 'components/wrappers/Card';
import {HelloStripe} from 'components/shared/accessories';
import {useHistory} from 'react-router-dom';

export default function Login(props) {
  useEffect(() => {
    // console.log("Login Mounted")
    return (() => {
      // console.log("Login Unmounted")
    });
  });


  const LoginButton = () => {
    const history = useHistory();

    const handleSubmit = (e) => {
      e.preventDefault();
      const data = {
        'username': e.target[0].value,
        'password': e.target[1].value,
      };
      fetch('/api/login/', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
          .then((resp) => {
            return resp.json();
          }).then((response) => {
            response = response['response'];
            console.log('response:', response);
            if (response['logged_in'] === true) {
              console.log('logged in type:', response['login_type']);
              props.changeLoginStatus(response['logged_in']);
              history.push('/account');
            } else {
              alert('who are you?');
            }
          });
    };


    return (
      <form onSubmit={(e) => handleSubmit(e)}>
        <label htmlFor="username">username:</label><br />
        <input type="text" id="username" name="username" /><br />
        <label htmlFor="password">password:</label><br />
        <input type="password" id="password" name="password" />
        <br />
        <br />
        <div>
          <button className="login-button">enter</button>
        </div>
      </form>
    );
  };

  return (
    <Card>
      <HelloStripe />
      <LoginButton />
    </Card>
  );
}
