import React from 'react';
import {Link} from 'react-router-dom';
import Card from 'components/wrappers/Card';
import stupidCat from 'images/pagenotfound-cat.png';
import styles from './styles.module.scss';

export default function PageNotFound() {
  return (
    <Card>
      <p>404 Page Not Found Sorry</p>
      <img className={styles.cat} src={stupidCat} alt="stupid confused cat" />
      <p><Link to='/' className={styles.link}> Go back home</Link></p>
    </Card>
  );
}
