import React from 'react';
import Card from 'components/wrappers/Card';
import {HelloStripe} from 'components/shared/accessories';
import {wiredLogoWhite} from 'components/pages/Home/images';
import styles from './styles.module.scss';

const Content = () => {
  return (
    <div>
      <HelloStripe />
      <img src={wiredLogoWhite} alt="wired" className={styles.wiredLogo} />
      <br />
      <p className={styles.title}>
        Hi, name is Tiger. This is my personal website.
      </p>
      <p className={styles.description}>
        Every component box below on this page is interactive in some way.
        Please click around!
      </p>
      <p className={styles.fine}>
        This page works best on desktop, since its interactivity
        is reliant on both mouse movement and clicking
      </p>
      <p className={styles.fine}>All GIFS are bitmapped by me</p>
      <p className={styles.description}>Have fun</p>
      <hr />
      <div className={styles.socialLinksContainer}>
        <a
          className={styles.socialLink}
          href="https://www.linkedin.com/in/tiger-shi/"
          rel="noreferrer"
          target="_blank">
            LinkedIn
        </a>
        <a
          className={styles.socialLink}
          href="https://github.com/Oeponn/"
          rel="noreferrer"
          target="_blank">
            Github
        </a>
        <a
          className={styles.socialLink}
          href="https://www.youtube.com/channel/UCQzNsKg_BoVDyCZnhpwntPA"
          rel="noreferrer"
          target="_blank">
            Youtube
        </a>
        <a
          className={styles.socialLink}
          href="https://www.instagram.com/oponn_/"
          rel="noreferrer"
          target="_blank">
            Instagram
        </a>
      </div>
    </div>
  );
};

const Intro = () => {
  return (
    <Card>
      <Content />
    </Card>
  );
};

export default Intro;
