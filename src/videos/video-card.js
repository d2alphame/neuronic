import React from 'react';

/**Function component to create a card object for each video file.
*/
function VideoCard(props) {
  return (
    <div className="video-card" 
         id={props.id}>
      <video className="video-card__thumbnail"
             onClick={props.loadVideo}
             data-card-id={props.id}>
        <source src={props.path} />
      </video>
      <img src="./icons/play.png" alt="" className="video-card__play-icon" />

      <div className="video-card__label">
        <p className="video-title">{props.name}</p>
        <p className="video-length">00:00:00</p>
      </div>
    </div>
  );
}

export default VideoCard;