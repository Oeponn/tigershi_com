import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';
import HelloStripe from './accessories'

import lain_x6 from '../images/lain_x6.png';
import grid_plane from '../images/grid_plane.png';
import manifest_hand from '../images/manifest_hand.png';
import manifest_hand_close from '../images/manifest_hand_close.png';
import wired_white from '../images/wired_logo-white.gif';
import wired_blue from '../images/wired_logo-blue.gif';
import akira_red from '../images/Front_Red.png';
import flying_castle from '../images/Flying_Castle_Bitmapped.gif';

import layer_00 from '../images/lain_layer_00.png';
import layer_00_cover from  '../images/lain_layer_00_cover.png';
import layer_01 from '../images/lain_layer_01.png';
import layer_02 from '../images/lain_layer_02.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handClosed: false,
      hiddenPieces: [1, 0, 0, 0],
      lain_screens_gif_url_start: "/images/lain_screens_1_bitmapped.gif",
      lain_screens_gif_url_end: "/images/lain_screens_2_bitmapped.gif",
    };
  }
  


  componentDidMount() {
    const NUMREALITYBUTTONS = 4

    console.log("Home Mounted")

    // setTimeout(() => {
    //   const screens = document.getElementById('lain-screen-start')
    //   screens.classList.add("hidden-image")
    // }, 4200)

    // const createRealityButtonHandler = (i) => {
    //   const pic = document.getElementsByClassName("p" + i)[0]
    //   const button = document.getElementsByClassName("b" + i)[0]

    //   button.addEventListener("mouseenter", () => {
    //     pic.classList.add("found-glow")
    //   });
    //   button.addEventListener("mouseleave", () => {
    //     pic.classList.remove("found-glow")
    //   });

    //   button.addEventListener("click", () => {
    //     const arr = this.state.hiddenPieces.slice()
    //     // Toggles array value
    //     arr[i] = arr[i] ? 0 : 1

    //     console.log(i, arr)

    //     if (arr[i]) {
    //       pic.classList.remove("hidden-image")
    //     }
    //     else {
    //       pic.classList.add("hidden-image")
    //     }
    //     this.setState({
    //       hiddenPieces: arr,
    //     });
    //   });
    // }

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

    // var i;

    // for (i = 0; i < NUMREALITYBUTTONS; i++) {
    //   createRealityButtonHandler(i);
    // }
  }

  componentWillUnmount() {
    console.log("Home Unmounted")
  }

  refreshReality = () => {
    const screens = document.getElementById('lain-screen-start')
    screens.classList.add("hidden-image")
    this.setState({
      lain_screens_gif_url_start: "",
    })

    setTimeout(() => {
      this.setState({ lain_screens_gif_url_start: "/images/lain_screens_1_bitmapped.gif" })
      screens.classList.remove("hidden-image")
    }, 0)

    // clearTimeout(screens_complete)
    // console.log("cleared")

    var screens_complete = setTimeout(() => {
      screens.classList.add("hidden-image")
      // console.log("ENDED")
    }, 4200)
  }

  // }
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
              <p>Every component box on this page is interactive in some way</p>
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

        {/* <InnerWrapper
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
                <img 
                  src={layer_00} className="full-width stack_image unselectable" alt="void wall"
                />
                <img 
                  src={layer_00_cover} className="full-width stack_image unselectable p0" alt="void wall cover"
                />
                <img
                  src={layer_01} className="full-width stack_image unselectable p1 hidden-image" alt="testimg_3"
                />
                <img
                  src={wired_blue} className="third-width stack_image unselectable p3 unselectable hidden-image wired-skew " alt="testimg_4"
                />
                <img
                  src={layer_02} className="full-width stack_image unselectable p2  hidden-image" alt="testimg_4"
                />
                <img
                  src={layer_02} className="full-width stack_bottom hidden-image" alt="testimg_4"
                />
              </div>
              

              <div className="reality-controller">
                <div>
                  <input type="checkbox"/>
                </div>
                <button className="reality-button b0">0</button>
                <button className="reality-button b1">1</button>
                <button className="reality-button b2">2</button>
                <button className="reality-button b3">3</button>
                <button onClick={this.refreshReality}>REFRESH REALITY</button>

              </div>

              <p className="home-title">SWITCHES</p>
              <p className="home-inspo">Compartmentalized image</p>
            </div>
          } /> */}

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

        {/* <InnerWrapper
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
          } /> */}

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
