import React from 'react';
import Card from 'components/wrappers/Card';
import {
  frontRed as akiraRed,
} from '../../pages/Home/images';
import styles from './styles.module.scss';

const Content = () => {
  return (
    <div>
      <div className={styles.akiraContainer}>
        <img src={akiraRed} className={styles.akiraRed} alt="akira tetsuo" />
      </div>
      <p className={styles.title}>TETSUO AWAKENS</p>
      <p className={styles.fine}>Akira - Front Design</p>
      <p className={styles.fine}>
        This is the front design of the Akira shirts I had made in Japan
      </p>
    </div>
  );
};

const Akira = () => {
  return (
    <Card>
      <Content />
    </Card>
  );
};

export default Akira;
