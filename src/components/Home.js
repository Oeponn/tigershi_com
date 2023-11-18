import React, {Component} from 'react';
import InnerWrapper from './InnerWrapper';
import HelloStripe from './accessories';

import lainX6 from '../images/lain_x6.png';
import gridPlane from '../images/grid_plane.png';
import manifestHand from '../images/manifest_hand.png';
import manifestHandClosed from '../images/manifest_hand_close.png';
import wiredWhite from '../images/wired_logo-white.gif';
import akiraRed from '../images/Front_Red.png';
import castleFlying from '../images/Castle_Flying.gif';
import castleSmall from '../images/Castle_Small.gif';
import castleMedium from '../images/Castle_Medium.gif';
import castleBottom from '../images/Castle_Bottom.png';
import rightArrow from '../images/castle_arrow_right.png';
import leftArrow from '../images/castle_arrow_left.png';

import layer00 from '../images/circle_hologram.gif';
import layer01 from '../images/lain_layer_01.gif';
import layer02 from '../images/lain_layer_02.gif';
import layer03 from '../images/lain_layer_03.png';
import layer04 from '../images/lain_layer_04.png';
import powerButton from '../images/power_button.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handClosed: false,
      hiddenPieces: [false, false, false, false, false, false],
      hiddenPiecesPrev: [false, false, false, false, false, false],
      lain_screens_gif_url_start: '/images/lain_screens_1_bitmapped.gif',
      lain_screens_gif_url_end: '/images/lain_screens_2_bitmapped.gif',
      timeoutID: 0,
      castle_order: [0, 1, 2],
      castle_description: [
        'Howl\'s Stumbling Castle',
        'Howl\'s Crawling Castle',
        'Howl\'s Flying Castle',
      ],
    };
  }

  reloadScreenTimeout = () => {
    // console.log("TESTING DESU:", this.state.timeoutID)

    const screens = document.getElementById('lain-screen-start');
    if (screens) {
      const screensComplete = setTimeout(() => {
        screens.classList.add('hidden-image');
        // console.log("ENDED")
      }, 4200);
      this.setState({
        timeoutID: screensComplete,
      });
    }
  };

  closeHand = () => {
    this.setState({
      handClosed: true,
    });
  };

  openHand = () => {
    this.setState({
      handClosed: false,
    });
  };

  castleOrderChange = (direction) => {
    const arr = this.state.castle_order.slice();
    const arrLen = arr.length;
    for (let i = 0; i < arrLen; i++) {
      arr[i] = (((arr[i] + direction) % 3) + arrLen) % arrLen;
    }
    this.setState({
      castle_order: arr,
    });
  };

  componentDidMount() {
    console.log('Home Mounted');
    this.reloadScreenTimeout();

    // NECESSARY TO CLEAR CACHE ON SAFARI SO THAT THE GIF ALWAYS RESTARTS >:(
    this.setState({lain_screens_gif_url_start: '/images/lain_screens_1_bitmapped.gif?a=' + Math.random()});
  }

  componentWillUnmount() {
    console.log('Home Unmounted');
  }

  refreshReality = () => {
    if (this.state.hiddenPieces[5]) {
      this.setState({
        hiddenPieces: [false, false, false, false, false, false],
      });
    }

    const screens = document.getElementById('lain-screen-start');
    if (screens) {
      screens.classList.add('hidden-image');
      this.setState({
        lain_screens_gif_url_start: '',
      });

      setTimeout(() => {
        // MATH.RANDOM() WILL ADD BACK IN IF IT STOPS WORKING FOR SAFARI, BUT I THNK I CAN GET AWAY WITH ONLY HAVING IT
        // HAPPEN IN COMPONENTDIDMOUNT()
        this.setState({lain_screens_gif_url_start: '/images/lain_screens_1_bitmapped.gif?a=' + Math.random()});

        this.setState({lain_screens_gif_url_start: '/images/lain_screens_1_bitmapped.gif'});
        screens.classList.remove('hidden-image');
      }, 0);

      // if button has been pressed before animation finished, abandon previous timeout
      clearTimeout(this.state.timeoutID);
      this.reloadScreenTimeout();
    }
  };

  toggleReality = (i) => (event) => {
    const arr = this.state.hiddenPieces;
    // console.log("i:", i, event.target.checked)
    if (i === 5) {
      if (event.target.checked) {
        // Store current state to restore if this is toggled off
        this.setState({
          hiddenPiecesPrev: arr,
        });
        // Switch off all switches except 4
        const brokenScreens = [false, false, false, false, false, true];
        this.setState({
          hiddenPieces: brokenScreens,
        });
      } else {
        this.setState({
          hiddenPieces: this.state.hiddenPiecesPrev,
        });
      }
    } else {
      arr[i] = event.target.checked;
      arr[5] = false;
      this.setState({
        hiddenPieces: arr,
      });
    }
  };

  render() {
    return (
      <div className="container-main">
        <InnerWrapper
          addClass=""
          innerContent=
            {
              <div>
                <HelloStripe />
                <div className="">
                  <img src={wiredWhite} alt="wired" className="quarter-width unselectable" />
                </div>
                {/* <HelloStripe /> */}
                <br />
                <p className="home-title">My name is Tiger</p>
                <p>This is my website</p>
                <p>Every component box below on this page is interactive in some way</p>
                <p className="home-inspo">Please note that this page works best on desktop, since its interactivity is reliant on both mouse movement and clicking</p>
                <p className="home-inspo">All GIFS are bitmapped by me</p>
                <p>Have fun</p>
                <hr />
                <div className="social-media-links-container">
                  <a className="whitelink soc-med-link" href="https://www.linkedin.com/in/tiger-shi/" rel="noreferrer" target="_blank">LinkedIn</a>
                  <a className="whitelink soc-med-link" href="https://github.com/Oeponn/" rel="noreferrer" target="_blank">Github</a>
                  <a className="whitelink soc-med-link" href="https://www.youtube.com/channel/UCQzNsKg_BoVDyCZnhpwntPA" rel="noreferrer" target="_blank">Youtube</a>
                  <a className="whitelink soc-med-link" href="https://www.instagram.com/oponn_/" rel="noreferrer" target="_blank">Instagram</a>
                </div>
              </div>
            } />


        {/* Not using wrapper here because I want the entire div to be clickable */}
        <div className="inner manifest-div" onMouseDown={this.closeHand} onMouseUp={this.openHand}>
          <div className="corner left">⌈</div>
          <div className="corner right">⌉</div>

          <div>
            <div>
              <img
                src={this.state.handClosed ? manifestHandClosed : manifestHand} id="manifest_hand" className="half-width unselectable" alt="floating hand"
              />
            </div>

            <div>
              <img src={gridPlane} className="full-width unselectable" alt="perspective grid" />
            </div>
            <div className="hand-shadow"></div>
            <p className="home-title">MANIFEST</p>
            <p className="home-inspo">Inspired by Cav Empt&apos;s Manifest Horizon Hoodie</p>
            <p className="home-inspo">Try to close the hand</p>
          </div>


          <div className="corner left">⌊</div>
          <div className="corner right">⌋</div>
        </div>

        <InnerWrapper
          addClass="howl-container"
          innerContent=
            {
              <div>
                <div className="howl-centered">
                  <img src={castleSmall} className={'unselectable carousel-image carousel-' + this.state.castle_order[0]} alt="Howl's Castle Flying" />
                  <img src={castleFlying} className={'unselectable carousel-image carousel-' + this.state.castle_order[1]} alt="Howl's Castle Small" />
                  <img src={castleMedium} className={'unselectable carousel-image carousel-' + this.state.castle_order[2]} alt="Howl's Castle Medium" />
                  <img src={castleBottom} className="full-width unselectable stack_bottom" alt="Howl's Castle Medium" />

                  <div className="castle-arrow_container">
                    <img src={leftArrow} onClick={() => this.castleOrderChange(-1)} className="castle-arrow" alt="left castle arrow" />
                    <img src={rightArrow} onClick={() => this.castleOrderChange(1)} className="castle-arrow" alt="right castle arrow" />
                  </div>
                </div>
                <p className="home-title">CASTLES</p>
                <p className="home-inspo">Versions of Howl Pendragon&apos;s moving castle</p>
                <p className="home-inspo">{this.state.castle_description[this.state.castle_order[0]]}</p>
              </div>
            } />

        <InnerWrapper
          addClass=""
          innerContent=
            {
              <div>
                <div className="akira-container">
                  <img src={akiraRed} className="full-width akira-red unselectable" alt="akira tetsuo" />
                </div>
                <p className="home-title">TETSUO AWAKENS</p>
                <p className="home-inspo">Akira - Front Design</p>
                <p className="home-inspo">This is the front design of the Akira shirts I had made in Japan</p>
              </div>
            } />

        <InnerWrapper
          addClass=""
          innerContent=
            {
              <div>
                <div className="stacked-images-container">
                  <img
                    src={process.env.PUBLIC_URL + this.state.lain_screens_gif_url_end} className="full-width stack_image unselectable" alt="LAIN'S SCREENS BACKGROUND"
                  />
                  <img
                    src={process.env.PUBLIC_URL + this.state.lain_screens_gif_url_start} id="lain-screen-start" className="full-width stack_image unselectable" alt="LAIN'S SCREENS"
                  />

                  {
                    this.state.hiddenPieces[0] ?
                      <img
                        src={wiredWhite} className="quarter-width stack_image unselectable wired-skew " alt="wired logo"
                      /> : <div></div>
                  }
                  {
                    this.state.hiddenPieces[1] ?
                      <img
                        src={layer00} className="third-width stack_image unselectable layer_00" alt="circle hologram"
                      /> : <div></div>
                  }
                  {
                    this.state.hiddenPieces[2] ?
                      <img
                        src={layer01} className="stack_image unselectable layer_01" alt="animated hologram 1"
                      /> : <div></div>
                  }
                  {
                    this.state.hiddenPieces[3] ?
                      <img
                        src={layer02} className="third-width stack_image unselectable layer_02" alt="LAIN'S FACE"
                      /> : <div></div>

                  }
                  {
                    this.state.hiddenPieces[4] ?
                      <img
                        src={layer03} className="full-width stack_image unselectable layer_03" alt="glowing screens"
                      /> : <div></div>
                  }
                  {
                    this.state.hiddenPieces[5] ?
                      <img
                        src={layer04} className="full-width stack_image unselectable" alt="broken computer screens"
                      /> : <div></div>
                  }

                  <img
                    src={layer02} className="full-width stack_bottom hidden-image" alt="testimg_4"
                  />
                </div>


                <div className="reality-controller">
                  <input type="checkbox" onChange={this.toggleReality(0)} checked={this.state.hiddenPieces[0]} />
                  <input type="checkbox" onChange={this.toggleReality(1)} checked={this.state.hiddenPieces[1]} />
                  <input type="checkbox" onChange={this.toggleReality(2)} checked={this.state.hiddenPieces[2]} />
                  <input type="checkbox" onChange={this.toggleReality(3)} checked={this.state.hiddenPieces[3]} />
                  <input type="checkbox" onChange={this.toggleReality(4)} checked={this.state.hiddenPieces[4]} />
                  <input type="checkbox" onChange={this.toggleReality(5)} checked={this.state.hiddenPieces[5]} />
                  <div onClick={this.refreshReality} className="refresh-reality-button">
                    <div className="power-button">
                      <img src={powerButton} alt="power button" />
                    </div>
                    <div className="refresh-reality">
                      REFRESH <br /> REALITY
                    </div>
                  </div>
                </div>

                <p className="home-title">SCREENS</p>
                <p className="home-inspo">What do these switches and buttons do?</p>
                <p className="home-inspo">This is a scene from Serial Experiments Lain. The animations you see on this page had to be bitmapped frame by frame</p>
              </div>
            } />

        <InnerWrapper
          addClass="lain-noise-div"
          innerContent=
            {
              <div>
                <div className='lain-container'>
                  <img src={lainX6} className="full-width hidden-image" alt="lain sketches" />
                </div>
                <p className="home-title">NOISE</p>
                <p className="home-inspo">Potential epilepsy warning</p>
                <p className="home-inspo">Lain Iwakura from Serial Experiments Lain, original sketch by Yoshitoshi Abe</p>
              </div>
            } />
      </div>
    );
  }
}
