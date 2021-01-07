import React, { Component } from "react";

class Media extends Component {
  render() {
    return (
      <div className="feedImageWrapper">
        <a href={this.props.url} rel="noopener" target="_blank" >
          <img className="feedImage" src={this.props.src} alt={this.props.alt} ></img>
        </a>
        <div className="feedImage-description">{this.props.alt}</div>
      </div>
    );
  }
}

export default Media;
