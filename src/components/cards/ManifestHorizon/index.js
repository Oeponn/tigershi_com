import React, {useState} from 'react';
import Card from 'components/wrappers/Card';
import openedHand from '../../pages/Home/images/manifest_hand.png';
import closedHand from '../../pages/Home/images/manifest_hand_close.png';
import gridPlane from '../../pages/Home/images/grid_plane.png';
import styles from './styles.module.scss';

const Content = ({closed}) => {
  return (
    <div>
      <img
        src={closed? closedHand : openedHand} className={styles.manifestHand}
        alt="floating hand"
      />

      <img
        src={gridPlane}
        className={styles.gridPlane}
        alt="perspective grid"
      />
      <div className={styles.handShadow}></div>
      <p className={styles.title}>MANIFEST</p>
      <p className={styles.fine}>
        Inspired by Cav Empt&apos;s Manifest Horizon Hoodie
      </p>
      <p className={styles.fine}>Try to close the hand</p>
    </div>
  );
};

const ManifestHorizon = () => {
  const [closed, setClosed] = useState(false);

  const handleMouseDown = () => {
    setClosed(true);
  };

  const handleMouseUp = () => {
    setClosed(false);
  };

  return (
    <Card onMouseDown={handleMouseDown} onMouseUp={handleMouseUp}>
      <Content closed={closed}/>
    </Card>
  );
};

export default ManifestHorizon;
