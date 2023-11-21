import React from 'react';
import {
  Akira,
  Computers,
  Howl,
  Intro,
  LainHeadache,
  ManifestHorizon,
} from 'components/cards';
import styles from './styles.module.scss';

const Home = () => {
  return (
    <div className={styles.cardContainer}>
      <Intro />
      <Howl />
      <Akira />
      <ManifestHorizon />
      <LainHeadache />
      <Computers />
    </div>
  );
};

export default Home;
