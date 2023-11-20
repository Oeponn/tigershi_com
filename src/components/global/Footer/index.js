
import React from 'react';
import logo from 'images/react_atom.svg';
import styles from './styles.module.scss';

const Footer = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.App}>
        <header className={styles.AppHeader}>
          <div className={styles.AppLogoContainer}>
            <img src={logo} className={styles.AppLogo} alt="logo" />
          </div>
          <p className={styles.description}>
              This website was first built in ReactJS by Tiger Shi ©2021
          </p>
        </header>
      </div>
      <div className={styles.lineContainer}>
        <hr className={styles.blackLine} />
      </div>
      <div className={styles.linksContainer}>
        <a className={styles.links} href="https://www.linkedin.com/in/tiger-shi/" rel="noreferrer" target="_blank">LinkedIn</a>
        <a className={styles.links} href="https://github.com/Oeponn/" rel="noreferrer" target="_blank">Github</a>
        <a className={styles.links} href="https://www.instagram.com/oponn_/" rel="noreferrer" target="_blank">Instagram</a>
      </div>
    </div>
  );
};

export default Footer;
