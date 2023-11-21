import React, {useEffect} from 'react';
import Card from 'components/wrappers/Card';
import {HelloStripe} from 'components/shared/accessories';

export default function Login() {
  useEffect(() => {
    console.log('Login Mounted');

    return (() => {
      console.log('Login Unmounted');
    });
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    const data = {
      'username': 'admin',
      'password': 'password',
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
          console.log('Response:', resp.text());

          return resp;
        });
  };

  return (
    <Card>
      <HelloStripe />

      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="create-form-container">
          {/* <label htmlFor="username">first:</label><br /> */}
          <input type="text" id="username" name="username"
            className="create-form-item" placeholder="first name" />
          <br />

          {/* <label htmlFor="username">last:</label><br /> */}
          <input type="text" id="username" name="username"
            className="create-form-item" placeholder="last name" />
          <br />

          <label htmlFor="username">username:</label>
          <br />
          <input type="text" id="username" name="username"
            className="create-form-item" /><br />

          <label htmlFor="password">password:</label>
          <br />
          <input type="password" id="password" name="password"
            className="create-form-item" /><br />

          <label htmlFor="password">confirm password:</label>
          <br />
          <input type="password" id="password" name="password"
            className="create-form-item" />
          <br />

          <label htmlFor="password">email:</label>c
          <br />
          <input type="email" id="email" name="email"
            className="create-form-item" />
          <br />
        </div>

        <br />
        <br />
        <div>
          <button className="login-button">create account</button>
        </div>
      </form>
    </Card>
  );
}
