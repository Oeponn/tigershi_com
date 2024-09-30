import {useEffect} from 'react';
import Card from 'components/wrappers/Card';
import {HelloStripe} from 'components/shared/accessories';
import {useHistory} from 'react-router-dom';

interface Account {
  changeLoginStatus: (arg: boolean) => void;
}

export default function Login({changeLoginStatus}: Account) {
  useEffect(() => {
    // console.log("Login Mounted")
    return (() => {
      // console.log("Login Unmounted")
    });
  });


  const LoginButton = () => {
    const history = useHistory();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      let data = {username: '', password: ''};
      const form = e.target as HTMLFormElement;
      const username = form.elements.namedItem('username') as HTMLInputElement;
      const password = form.elements.namedItem('password') as HTMLInputElement;
      data = {
        username: username.value,
        password: password.value,
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
              changeLoginStatus(response['logged_in']);
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
