import React from 'react';
import Card from 'components/wrappers/Card';
import {
  lainX6,
} from '../../pages/Home/images';
import styles from './styles.module.scss';

const Content = () => {
  return (
    <div>
      <div className={styles.lainContainer}>
        <img src={lainX6} className={styles.lainSketch} alt="lain sketches" />
      </div>
      <p className={styles.title}>NOISE</p>
      <p className={styles.fine}>
        Lain Iwakura from Serial Experiments Lain, original sketch by Yoshitoshi
        Abe
      </p>
    </div>
  );
};

const LainHeadache = () => {
  return (
    <Card addClasses={styles.lainNoise}>
      <Content />
    </Card>
  );
};

export default LainHeadache;
