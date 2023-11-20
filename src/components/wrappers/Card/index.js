import React from 'react';
import styles from './styles.module.scss';

export default function Card({
  addClasses,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
}) {
  const containerClasses = [styles.cardContainer, addClasses].join(' ');

  return (
    <div
      className={containerClasses}
      onClick={onClick}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className={styles.upperLeft}>⌈</div>
      <div className={styles.upperRight}>⌉</div>

      {children}

      <div className={styles.bottomLeft}>⌊</div>
      <div className={styles.bottomRight}>⌋</div>
    </div>
  );
};
