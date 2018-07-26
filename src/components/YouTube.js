import React, { Component } from 'react';
import './YouTube.css';
class YouTube extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    var videoSrc = "https://www.youtube.com/embed/" +
      this.props.video + "?autoplay=" +
      this.props.autoplay + "&rel=" +
      this.props.rel + "&modestbranding=" +
      this.props.modest;
  return (
        <div className="youtube-container">
          <iframe className="player" type="text/html" width="100%" height="100%"
            src={videoSrc} frameBorder="0"/>
        </div>
    );
  }
}

export default YouTube;
