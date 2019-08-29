import React from 'react';
import './videos.scss';
import VideoFolder from './video-folder';

let electronApp;

let body = document.querySelector('body'),
    clickBlocker;

//Declare the following global variables for use in functions loadVideo and closeVideo.
var card, cardClone, thumbnail, cardLabel, initialP, winDimension, frame, leftP, topP, videoCard, 
    titleBar;

function loadVideo(event) {
  const id = event.target.dataset.cardId;
  card = document.getElementById(id);
  cardClone = card.cloneNode(true);

  cardClone.id = `${id}-clone`;
  cardClone.classList.remove("inline-block-element");
  
  initialP = card.getBoundingClientRect();
  cardClone.style.left = `${initialP.left - 1}px`; //Subtract 1px of the Window border
  cardClone.style.top = `${initialP.top - 1}px`; //1px window border.
  cardClone.classList.add('video-play-window');  

  thumbnail = cardClone.querySelector('.thumbnail');
  cardLabel = cardClone.querySelector('div');

  body.appendChild(cardClone);
  card.style.opacity = '0';

  setTimeout(()=>{ //Set a delay after creating the card clone before starting transition to ensure animation is shown.
    //Dim the window in the background and prevent clicking outside the video frame.
    clickBlocker = document.querySelector(".click-blocker");
    clickBlocker.style.display = "block";
    setTimeout(()=>{
      clickBlocker.style.opacity = "0.56";
      titleBar = document.querySelector('.titleBar');
      titleBar.style.opacity = "0.54";
    }, 500);

    //cardClone.style.left = '';
    //cardClone.style.top = '';
    cardClone.classList.add('video-play-window--is-playing');

    setTimeout(()=>{
      thumbnail.classList.add('video-play-window--is-playing__video');

      cardLabel.classList.add('video-play-window--is-playing__label');

    }, 100)

    //Play the video.
    setTimeout(()=>{
      thumbnail.controls = true;
      thumbnail.play();
    }, 600);
  }, 100);
}

document
  .querySelectorAll(`video`)
  .forEach((video)=> video.addEventListener('durationchange', (e)=>{
    if (e.target.duration > 20)
      e.target.currentTime = 10;
    else 
      e.target.currentTime = 2;
    
    let duration = { //Calculate duration in HH:MM:SS
      raw: e.target.duration,
      seconds: Math.floor(e.target.duration) % 60,
      minutes:  Math.floor(e.target.duration / 60) % 60,
      hours: Math.floor(Math.floor(e.target.duration / 60) / 60)
    }

    document
      .querySelector(`#${videoCard.cardId} .video-length`)
      .innerHTML = `${duration.hours}:${('0'+duration.minutes).slice(-2)}:${('0'+duration.seconds).slice(-2)}`; //A little hack to force 2 digits.
  }));

const closeVideo = ()=> {
  if (!cardClone) return;
  thumbnail.pause();
  clickBlocker.style.opacity = "0";
  titleBar.style.opacity = "initial";

  cardClone.classList.add('video-play-window--is-closing');
  cardClone.style.left = `${initialP.left - 1}px`; //Subtract 1px of the Window border
  cardClone.style.top = `${initialP.top - 1}px`;

  setTimeout(()=>{
    card.style.opacity = '1';
    //console.log(body.id + '\n\n' + cardClone.id);
    body.removeChild(cardClone);
    cardClone = null;
    clickBlocker.style.display = "none";
  }, 1001);
}


class Videos extends React.Component {
  constructor(props) {
    super(props);

    electronApp = props.electron.remote.app;
  }

  render() {
    const {folders} = this.props;

    if (!folders) return null;

    if (folders.length < 1) {
      window.alert(
        `No supported videos found in the default Videos directory.
        ${electronApp.getPath('videos')}`
      );
      return null;
    }

    return (
      <div className="content-wrapper">
        {
          folders.map((folder)=> {
            return (
              <VideoFolder 
                key={folder.path}
                folder={folder} 
                loadVideo={loadVideo}>
              </VideoFolder>
            );
          })
        }
      
        <button className="close-video"
                onClick={(e)=>{
                  closeVideo();
                  //e.target.style.display = "none";
                }}>
          Close
        </button>
        
        <div className="click-blocker"></div>
      </div>
    );
  };  
}

export default Videos;
