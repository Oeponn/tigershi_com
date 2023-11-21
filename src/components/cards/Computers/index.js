import React, {useEffect, useState} from 'react';
import Card from 'components/wrappers/Card';
import {
  wiredLogoWhite as layer00,
  circleHologram as layer01,
  lainLayer01 as layer02,
  lainLayer02 as layer03,
  lainLayer03 as layer04,
  lainLayer04 as layer05,
  powerButton,
} from 'components/pages/Home/images';
import styles from './styles.module.scss';

const Content = ({
  hideStartScreen,
  showPieces: show,
  refreshReality,
  screenUrlStart,
  screenUrlIdle,
  toggleReality,
}) => {
  const shownArr = show.map((shown) => {
    if (!shown) {
      return styles.hidden;
    } else {
      return null;
    }
  });

  const startScreenStyle = {visibility: hideStartScreen ? 'hidden' : 'visible'};

  return (
    <div>
      <div className={styles.stackedImagesContainer}>
        <img
          // src={process.env.PUBLIC_URL + screenUrlIdle}
          src={screenUrlIdle}
          className={styles.stackImage}
        />
        <img
          // src={process.env.PUBLIC_URL + screenUrlStart}
          src={screenUrlStart}
          className={styles.stackImage}
          style={startScreenStyle}
        />

        <img src={layer00} className={`${styles.layer00} ${shownArr[0]}`}/>
        <img src={layer01} className={`${styles.layer01} ${shownArr[1]}`}/>
        <img src={layer02} className={`${styles.layer02} ${shownArr[2]}`}/>
        <img src={layer03} className={`${styles.layer03} ${shownArr[3]}`}/>
        <img src={layer04} className={`${styles.layer04} ${shownArr[4]}`}/>
        <img src={layer05} className={`${styles.layer05} ${shownArr[5]}`}/>
        <img src={layer03} className={styles.bottomStack}/>
      </div>


      <div className={styles.realityController}>
        <input type='checkbox' onChange={toggleReality(0)} checked={show[0]} />
        <input type='checkbox' onChange={toggleReality(1)} checked={show[1]} />
        <input type='checkbox' onChange={toggleReality(2)} checked={show[2]} />
        <input type='checkbox' onChange={toggleReality(3)} checked={show[3]} />
        <input type='checkbox' onChange={toggleReality(4)} checked={show[4]} />
        <input type='checkbox' onChange={toggleReality(5)} checked={show[5]} />
        <div onClick={refreshReality} className={styles.refreshRealityButton}>
          <div className={styles.powerButton}>
            <img src={powerButton} alt='power button' />
          </div>
          <div className='refresh-reality'>
                      REFRESH <br /> REALITY
          </div>
        </div>
      </div>

      <p className={styles.title}>SCREENS</p>
      <p className={styles.fine}>What do these switches and buttons do?</p>
      <p className={styles.fine}>This is a scene from Serial Experiments Lain.
        The animations you see on this page had to be bitmapped frame by frame
      </p>
    </div>
  );
};

const Computers = () => {
  const [showPieces, setShowPieces] = useState(
      [false, false, false, false, false, false],
  );
  const [showPiecesPrev, setShowPiecesPrev] = useState(
      [false, false, false, false, false, false],
  );
  const [hideStartScreen, setHideStartScreen] = useState(false);
  const [screenUrlStart, setScreenUrlStart] = useState(
      '/images/lain_screens_1_bitmapped.gif',
  );
  const screenUrlLoad = '/images/lain_screens_1_bitmapped.gif';
  const screenUrlIdle = '/images/lain_screens_2_bitmapped.gif';
  const [timeoutID, setTimeoutID] = useState('');

  useEffect(() => {
    // Force GIF to restart on refresh
    reloadScreenTimeout();
    setScreenUrlStart(screenUrlLoad + '?a=' + Math.random());
  }, []);

  useEffect(() => {
    setScreenUrlStart(screenUrlLoad);
  }, [screenUrlStart]);

  const reloadScreenTimeout = () => {
    const screensComplete = setTimeout(() => {
      setHideStartScreen(true);
    }, 4200);
    setTimeoutID(screensComplete);
  };

  const refreshReality = () => {
    if (showPieces[5]) {
      setShowPieces([false, false, false, false, false, false]);
    }
    setHideStartScreen(true);
    setScreenUrlStart('');

    setTimeout(() => {
      setScreenUrlStart(screenUrlLoad + '?a=' + Math.random());
      // setScreenUrlStart(screenUrlLoad);
      setHideStartScreen(false);
    }, 0);

    // If button has been pressed before animation finished
    // abandon previous timeout
    clearTimeout(timeoutID);
    reloadScreenTimeout();
  };

  const toggleReality = (i) => (event) => {
    // Not using slice or a ... spread operator will result in shallow
    // comparisons,leading the state to believe nothing has changed
    const arr = showPieces.slice();
    if (i === 5) {
      if (event.target.checked) {
        // Store current state to restore if this is toggled off
        setShowPiecesPrev(arr);
        // Switch off all switches except 4
        const brokenScreens = [false, false, false, false, false, true];
        setShowPieces(brokenScreens);
      } else {
        setShowPieces(showPiecesPrev);
      }
    } else {
      arr[i] = event.target.checked;
      arr[5] = false;
      setShowPieces(arr);
    }
  };

  return (
    <Card>
      <Content
        hideStartScreen={hideStartScreen}
        showPieces={showPieces}
        refreshReality={refreshReality}
        screenUrlStart={screenUrlStart}
        screenUrlIdle={screenUrlIdle}
        toggleReality={toggleReality}
      />
    </Card>
  );
};

export default Computers;
