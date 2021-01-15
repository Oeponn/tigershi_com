import React, { Component } from "react";
import InnerWrapper from './InnerWrapper';

import lain_x6 from '../images/lain_x6.png';
import grid_plane from '../images/grid_plane.png';
import manifest_hand from '../images/manifest_hand.png';
import manifest_hand_close from '../images/manifest_hand_close.png';
import orb from '../images/orb-animation.gif';
import akira_red from '../images/Front_Red.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handClosed: false,
    };
  }

  componentDidMount() {
    console.log("Home Mounted")

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

  // }
  render() {
    return (
      <div className="container-main">

        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div className="pulse-container">
                ║<span className="fade-3 pulse">I</span>
                <span className="fade-2 pulse">H</span>
                <span className="fade-1 pulse">E</span>
                <span className="fade-0 pulse">L</span>
                <span className="fade-1 pulse">L</span>
                <span className="fade-2 pulse">O</span>
                <span className="fade-3 pulse">I</span>║
              </div>

              <div className="home-orb-container">
                <img src={orb} alt="orb" className="half-width unselectable home-orb" />
              </div>
              <p className="home-title">My name is Tiger</p>
              <p>This is my website</p>
              <p >Every component box on this page is interactive in some way</p>
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
          addClass="lain-noise-div"
          innerContent=
          {
            <div>
              <div className='lain-container'>
                <img src={lain_x6} className="full-width lain-hidden" alt="lain sketches" />
              </div>
              <p className="home-title">NOISE</p>
              <p className="home-inspo">Bitmapped sketch of Lain Iwakura from Serial Experiments Lain, original sketch by Yoshitoshi Abe</p>
            </div>
          } />


      </div>
    )
  }
}
