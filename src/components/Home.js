import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';
import HelloStripe from './accessories'

import lain_x6 from '../images/lain_x6.png';
import grid_plane from '../images/grid_plane.png';
import manifest_hand from '../images/manifest_hand.png';
import manifest_hand_close from '../images/manifest_hand_close.png';
import wired_white from '../images/wired_logo-white.gif';
import akira_red from '../images/Front_Red.png';
import flying_castle from '../images/Flying_Castle_Bitmapped.gif';

import layer_00 from '../images/lain_layer_00.gif';
import layer_01 from '../images/lain_layer_01.gif';
import layer_02 from '../images/lain_layer_02.gif';
import layer_03 from '../images/lain_layer_03.png';
import layer_04 from '../images/lain_layer_04.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handClosed: false,
      hiddenPieces: [false, false, false, false, false, false],
      hiddenPiecesPrev: [false, false, false, false, false, false],
      lain_screens_gif_url_start: "/images/lain_screens_1_bitmapped.gif",
      lain_screens_gif_url_end: "/images/lain_screens_2_bitmapped.gif",
      timeoutID: 0,
    };
  }

  reloadScreenTimeout = () => {
    // console.log("TESTING DESU:", this.state.timeoutID)

    const screens = document.getElementById('lain-screen-start')
    if (screens) {
      const screens_complete = setTimeout(() => {
        screens.classList.add("hidden-image")
        console.log("ENDED")
      }, 4200)
      this.setState({
        timeoutID: screens_complete,
      })
    }
  }



  componentDidMount() {
    console.log("Home Mounted")
    this.reloadScreenTimeout()

    const manifest_container = document.getElementsByClassName("manifest-div")[0]
    manifest_container.addEventListener("mousedown", () => {
      this.setState({
        handClosed: true,
      })
    });
    manifest_container.addEventListener("mouseup", () => {
      this.setState({
        handClosed: false,
      })
    });
  }

  componentWillUnmount() {
    console.log("Home Unmounted")
  }

  refreshReality = () => {
    if (this.state.hiddenPieces[4]) {
      this.setState({
        hiddenPieces: [false, false, false, false, false, false],
      })
    }

    const screens = document.getElementById('lain-screen-start')
    if (screens) {

      screens.classList.add("hidden-image")
      this.setState({
        lain_screens_gif_url_start: "",
      })

      setTimeout(() => {
        this.setState({ lain_screens_gif_url_start: "/images/lain_screens_1_bitmapped.gif" })
        screens.classList.remove("hidden-image")
      }, 0)

      // if button has been pressed before animation finished, abandon previous timeout
      clearTimeout(this.state.timeoutID)
      this.reloadScreenTimeout()
    }
  }

  toggleReality = (i) => (event) => {
    const arr = this.state.hiddenPieces
    // console.log("i:", i, event.target.checked)
    if (i === 4) {
      if (event.target.checked) {
        // Store current state to restore if this is toggled off
        this.setState({
          hiddenPiecesPrev: arr,
        })
        // Switch off all switches except 4
        const brokenScreens = [false, false, false, false, true, false]
        this.setState({
          hiddenPieces: brokenScreens,
        })
      }
      else {
        this.setState({
          hiddenPieces: this.state.hiddenPiecesPrev,
        })
      }
    }
    else {
      arr[i] = event.target.checked
      arr[4] = false
      this.setState({
        hiddenPieces: arr,
      })
    }
  }

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
                <img src={wired_white} alt="wired" className="quarter-width unselectable" />
              </div>
              <HelloStripe />
              <br />
              <p className="home-title">My name is Tiger</p>
              <p>This is my website</p>
              <p>Every component box below on this page is interactive in some way</p>
              <p className="home-inspo">Please note that this page works best on desktop, since its interactivity is reliant on both mouse movement and clicking</p>
              <p>Please enjoy yourself</p>
              <hr />
              <div className="social-media-links-container">
                <a className="whitelink" href="https://www.linkedin.com/in/tiger-shi/" rel="noreferrer" target="_blank">LinkedIn</a>
                <a className="whitelink" href="https://github.com/Oeponn/" rel="noreferrer" target="_blank">Github</a>
                <a className="whitelink" href="https://www.instagram.com/oponn_/" rel="noreferrer" target="_blank">Instagram</a>
              </div>
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
                      src={wired_white} className="quarter-width stack_image unselectable wired-skew " alt="wired logo"
                    /> : <div></div>
                }

                {
                  this.state.hiddenPieces[1] ?
                    <img
                      src={layer_01} className="stack_image unselectable layer_01" alt="animated hologram 1"
                    /> : <div></div>
                }

                {
                  this.state.hiddenPieces[2] ?
                    <img
                      src={layer_02} className="third-width stack_image unselectable layer_02" alt="LAIN'S FACE"
                    /> : <div></div>

                }
                {
                  this.state.hiddenPieces[3] ?
                    <img
                      src={layer_03} className="full-width stack_image unselectable layer_03" alt="glowing screens"
                    /> : <div></div>
                }

                {
                  this.state.hiddenPieces[4] ?
                    <img
                      src={layer_04} className="full-width stack_image unselectable" alt="broken computer screens"
                    /> : <div></div>
                }

                {
                  this.state.hiddenPieces[5] ?
                    <img
                      src={layer_00} className="full-width stack_image unselectable layer_00" alt="void wall"
                    /> : <div></div>
                }

                <img
                  src={layer_02} className="full-width stack_bottom hidden-image" alt="testimg_4"
                />
              </div>


              <div className="reality-controller">
                <input type="checkbox" onChange={this.toggleReality(0)} checked={this.state.hiddenPieces[0]} />
                <input type="checkbox" onChange={this.toggleReality(1)} checked={this.state.hiddenPieces[1]} />
                <input type="checkbox" onChange={this.toggleReality(2)} checked={this.state.hiddenPieces[2]} />
                <input type="checkbox" onChange={this.toggleReality(3)} checked={this.state.hiddenPieces[3]} />
                <input type="checkbox" onChange={this.toggleReality(4)} checked={this.state.hiddenPieces[4]} />
                <input type="checkbox" onChange={this.toggleReality(5)} checked={this.state.hiddenPieces[5]} />
                <button onClick={this.refreshReality}>REFRESH <br /> REALITY</button>
              </div>

              <p className="home-title">SWITCHES</p>
              <p className="home-inspo">Compartmentalized image</p>
            </div>
          } />

        <InnerWrapper
          addClass="manifest-div"
          innerContent=
          {
            <div>
              <div>
                <img
                  src={this.state.handClosed ? manifest_hand_close : manifest_hand} id="manifest_hand" className="half-width unselectable" alt="floating hand"
                />
              </div>

              <div>
                <img src={grid_plane} className="full-width unselectable" alt="perspective grid" />
              </div>
              <div className="hand-shadow"></div>
              <p className="home-title">MANIFEST</p>
              <p className="home-inspo">Inspired by Cav Empt's Manifest Horizon Hoodie</p>
            </div>
          } />


        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div className="akira-container">
                <img src={akira_red} className="full-width akira-red unselectable" alt="akira tetsuo" />
              </div>
              <p className="home-title">TETSUO AWAKENS</p>
              <p className="home-inspo">Akira Shirt - Front Design</p>
            </div>
          } />

        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div className="">
                <img src={flying_castle} className="full-width unselectable" alt="Howl's Castle Flying" />
              </div>
              <p className="home-title">CASTLE</p>
              <p className="home-inspo">Howl's moving castle V3</p>
            </div>
          } />

        <InnerWrapper
          addClass="lain-noise-div"
          innerContent=
          {
            <div>
              <div className='lain-container'>
                <img src={lain_x6} className="full-width hidden-image" alt="lain sketches" />
              </div>
              <p className="home-title">NOISE</p>
              <p className="home-inspo">Bitmapped sketch of Lain Iwakura from Serial Experiments Lain, original sketch by Yoshitoshi Abe</p>
            </div>
          } />
      </div>
    )
  }
}
