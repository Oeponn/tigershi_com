import React, {useState} from 'react';
import Card from 'components/wrappers/Card';
import {
  castleArrowLeft,
  castleArrowRight,
  castleBottom,
  castleFlying,
  castleMedium,
  castleSmall,
} from '../../pages/Home/images';
import styles from './styles.module.scss';

const Content = ({
  handleLeftArrowClick,
  handleRightArrowClick,
  castleDescription,
  castleOrder,
}) => {
  const currentCastleIndex = castleOrder[0];
  const carouselStyles = castleOrder.map((index) => {
    return styles[`carousel${index}`];
  });

  return (
    <div>
      <div className={styles.carousel}>
        <img src={castleFlying} className={carouselStyles[0]} />
        <img src={castleMedium} className={carouselStyles[1]} />
        <img src={castleSmall} className={carouselStyles[2]} />
        <img src={castleBottom} className={styles.bottomStack} />

        <div className={styles.arrowContainer}>
          <img src={castleArrowLeft} onClick={handleLeftArrowClick}
            className={styles.castleArrow} alt="left castle arrow"
          />
          <img src={castleArrowRight} onClick={handleRightArrowClick}
            className={styles.castleArrow} alt="right castle arrow"
          />
        </div>
      </div>
      <p className={styles.title}>CASTLES</p>
      <p className={styles.fine}>
        Versions of Howl Pendragon&apos;s moving castle
      </p>
      <p className={styles.fine}>{castleDescription[currentCastleIndex]}</p>
    </div>
  );
};

const Howl = () => {
  const [castleOrder, setCastleOrder] = useState([0, 1, 2]);
  const castleDescription = [
    'Howl\'s Flying Castle',
    'Howl\'s Stumbling Castle',
    'Howl\'s Crawling Castle',
  ];

  const castleOrderChange = (direction) => {
    const arr = castleOrder.slice();
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
      arr[i] = (((arr[i] + direction) % 3) + arrLen) % arrLen;
    }
    setCastleOrder(arr);
  };

  const handleLeftArrowClick = () => {
    castleOrderChange(-1);
  };

  const handleRightArrowClick = () => {
    castleOrderChange(1);
  };

  return (
    <Card>
      <Content
        handleLeftArrowClick={handleLeftArrowClick}
        handleRightArrowClick={handleRightArrowClick}
        castleDescription={castleDescription}
        castleOrder={castleOrder}
      />
    </Card>
  );
};

export default Howl;
