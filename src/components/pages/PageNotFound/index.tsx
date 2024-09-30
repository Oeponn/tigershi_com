import {Link} from 'react-router-dom';
import Card from 'components/wrappers/Card';
import stupidCat from 'images/pagenotfound-cat.png';
import styles from './styles.module.scss';
import {useParams} from 'react-router-dom';

interface PageNotFoundParams {
  [key: string]: string | undefined;
}

export default function PageNotFound() {
  const {name} = useParams<PageNotFoundParams>();

  // useEffect(() => {
  //   if (name) {
  //     fetch(`/api/${name}`) // Update with your Flask server URL
  //         .then((response) => response.text())
  //         .then((data) => {
  //           console.log('data:', data);
  //         })
  //         .catch((error) => console.error('Error fetching data: ', error));
  //   }
  // }, [name]);

  return (
    <Card>
      <p>I wasn't able to find the '{name ?? 'unknown'}' page, sorry</p>
      <img className={styles.cat} src={stupidCat} alt="stupid confused cat" />
      <p><Link to='/' className={styles.link}> Go back home</Link></p>
    </Card>
  );
}
