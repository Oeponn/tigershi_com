import styles from './styles.module.scss';

const HelloStripe = () => {
  return (
    <div className={styles.pulseContainer}>
      ║
      <span className={styles.fade3}>I</span>
      <span className={styles.fade2}>H</span>
      <span className={styles.fade1}>E</span>
      <span className={styles.fade0}>L</span>
      <span className={styles.fade1}>L</span>
      <span className={styles.fade2}>O</span>
      <span className={styles.fade3}>I</span>
      ║
    </div>
  );
};

export default HelloStripe;
