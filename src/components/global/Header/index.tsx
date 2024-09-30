/* eslint-disable max-len */
import {NavLink} from 'react-router-dom';
import {ReactComponent as OutboundIcon} from 'images/outbound.svg';
import styles from './styles.module.scss';

const Header = ({loggedIn}: {loggedIn: boolean}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.oponn}>Oponn</h1>
      <div className={styles.linksContainer}>
        <NavLink to="/" className={({isActive}) =>
    isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
        }>Home</NavLink>
        <a
          className={styles.headerLink}
          href="https://undrstand.me/"
          rel="noreferrer"
          target="_blank">
            Undrstand.me
          <OutboundIcon className={styles.outbound} />
        </a>
        <NavLink to="/art" className={({isActive}) =>
    isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
        }> Art</NavLink>
        {/* <NavLink to="/curation" className={({isActive}) =>
    isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
        }>Curation</NavLink> */}
        {
          loggedIn ?
            <NavLink to="/account" className={({isActive}) =>
              isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
            }>Account</NavLink> :
            null
        }
        {/* <NavLink to="/store" className={({isActive}) =>
    isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
        }>Store</NavLink> */}
        {
          loggedIn ?
            <NavLink to="/logout" className={({isActive}) =>
              isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
            }>Exit</NavLink> :
            <NavLink to="/login" className={({isActive}) =>
              isActive ? `${styles.headerLink} ${styles.activeLink}` : styles.headerLink
            }>Login</NavLink>
        }
      </div>
      <div className={styles.lineContainer}>
        <hr className={styles.blackLine} />
      </div>
    </div>
  );
};

export default Header;
