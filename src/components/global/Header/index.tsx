/* eslint-disable max-len */
import React from 'react';
import {NavLink} from 'react-router-dom';
import {ReactComponent as OutboundIcon} from 'images/outbound.svg';
import styles from './styles.module.scss';

const Header = ({loggedIn}: {loggedIn: boolean}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.oponn}>Oponn</h1>
      <div className={styles.linksContainer}>
        <NavLink to="/" exact={true} activeClassName={styles.activeLink} className={styles.headerLink}>Home</NavLink>
        <a
          className={styles.headerLink}
          href="https://undrstand.me/"
          rel="noreferrer"
          target="_blank">
            Undrstand.me
          <OutboundIcon className={styles.outbound} />
        </a>
        <NavLink to="/art" exact={true} activeClassName={styles.activeLink} className={styles.headerLink}> Art</NavLink>
        {/* <NavLink to="/curation" activeClassName={styles.activeLink} className={styles.headerLink}>Curation</NavLink> */}
        {
          loggedIn ?
            <NavLink to="/account" activeClassName={styles.activeLink} className={styles.headerLink}>Account</NavLink> :
            null
        }
        {/* <NavLink to="/store" activeClassName={styles.activeLink} className={styles.headerLink}>Store</NavLink> */}
        {
          loggedIn ?
            <NavLink to="/logout" activeClassName={styles.activeLink} className={styles.headerLink}>Exit</NavLink> :
            <NavLink to="/login" activeClassName={styles.activeLink} className={styles.headerLink}>Login</NavLink>
        }
      </div>
      <div className={styles.lineContainer}>
        <hr className={styles.blackLine} />
      </div>
    </div>
  );
};

export default Header;
