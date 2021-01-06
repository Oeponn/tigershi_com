import React, { Component} from "react";
import InnerWrapper from './InnerWrapper';
// import {addInvertListeners} from './cursorhelpers'
import lain_x6 from '../images/lain_x6.png';
import grid_plane from '../images/grid_plane.png';
import manifest_hand from '../images/manifest_hand.png';
import manifest_hand_close from '../images/manifest_hand_close.png';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handClosed: false,
    };
  }

  componentDidMount() {
    console.log("Home Mounted")

    const manifest_container = document.getElementsByClassName("manifest")[0]

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
              <div>____</div>
              <p>You might know me as oponn_</p>
              <p>My name is Tiger</p>
              <p>This is my website</p>
            </div>
          } />

        <InnerWrapper
          addClass="manifest"
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
              <p>MANIFEST</p>
              <div className="hand-shadow"></div>
            </div>
          } />

        <InnerWrapper
          addClass=""
          innerContent=
          {
            <div>
              <div>
                <img src={lain_x6} className="full-width" alt="lain sketches" />
              </div>
              <p>NOISE</p>
            </div>
          } />


      </div>
    )
  }
}
