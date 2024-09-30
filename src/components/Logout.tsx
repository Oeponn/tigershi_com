import {useEffect} from 'react';
import Card from './wrappers/Card';
import {useHistory} from 'react-router-dom';

interface Account {
  changeLoginStatus: (arg: boolean) => void;
}

export default function Logout({changeLoginStatus}: Account) {
  useEffect(() => {
    console.log('Login Mounted');

    return (() => {
      console.log('Login Unmounted');
    });
  });

  function Exit() {
    const history = useHistory();

    function handleClick() {
      fetch('/api/logout/', {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      })
          .then((resp) => {
            console.log('Response:', resp.ok);
            changeLoginStatus(false);
            history.push('/');
          });
    }

    return (
      <button type="button" onClick={handleClick}>
        Exit
      </button>
    );
  }


  return (
    <Card>
      <p>____</p>
      <br />

      <div>
        <Exit />
      </div>

      <div>
          you are leaving me?
      </div>
    </Card>
  );
}
