import React from 'react';

/**Function component to create a card object for each video file.
*/
function VideoCard(props) {
  return (
    <div className="video-card inline-block-element" 
         id={props.id}>
      <video className="thumbnail"
             onClick={props.loadVideo}
             data-card-id={props.id}>
        <source src={props.path} />
      </video>
      <img src="./icons/play.png" alt="" />

      <div className="w3-panel">
        <p className="video-title">{props.name}</p>
        <p className="video-length">00:00:00</p>
      </div>
    </div>
  );
}

export default VideoCard;