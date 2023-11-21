import React from 'react';
import styles from './styles.module.scss';

interface Card {
  addClasses?: string;
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onMouseDown?: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp?: React.MouseEventHandler<HTMLDivElement>;
}

export default function Card({
  addClasses,
  children,
  onClick,
  onMouseDown,
  onMouseUp,
}: Card) {
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
}
