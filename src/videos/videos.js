import React from 'react';
import './videos.scss';
import VideoGroup from './video-group';

const {useEffect} = React;

let electronApp;

//Declare the following global variables for use in functions loadVideo and closeVideo.
var card, cardClone, thumbnail, clickBlocker, /*initialPosition, winDimension, 
    frame, leftP, topP, cardLabel,*/componentRoot, videoCard, titleBar;

const setInitialClonePosition = (card)=> {
  const id = "initial-card-clone-position";

  /*const styleExists = document.head.querySelector(`#${id}`);
  if ( styleExists )
    document.head.removeChild(styleExists);*/

  let styleElem = document.head.querySelector(`#${id}`);
  if (!styleElem) {
    styleElem = document.createElement('style');
    styleElem.id = id;
    document.head.prepend(styleElem);
  }

  //const styleSheet = styleElem.sheet;

  const initialPosition = card.getBoundingClientRect();
  const styleRule = `
    main#videos .is-about-to-play,
    main#videos .is-closing {
      left: ${initialPosition.left - 1}px;
      top: ${initialPosition.top - 1}px;
    }`;

  styleElem.innerHTML = styleRule;
  //styleSheet.insertRule(styleRule, 0); //insert at index 0 of styleSheet.cssRules 'array'.
}    

function loadVideo(event) {
  componentRoot = document.querySelector('main#videos');

  const id = event.target.dataset.cardId;
  card = document.getElementById(id);
  cardClone = card.cloneNode(true);
  cardClone.id = `${id}-clone`;
  cardClone.classList.add('is-play-window', 'is-about-to-play');
  setInitialClonePosition(card);  

  thumbnail = cardClone.querySelector('.video-card__thumbnail');

  componentRoot.appendChild(cardClone);
  card.style.opacity = '0';
  document.querySelector('.close-video')
    .style.display = 'block';

  setTimeout(()=>{
    //Dim the window in the background and prevent clicking outside the video frame.
    clickBlocker = document.querySelector(".click-blocker");
    clickBlocker.style.display = "block";
    clickBlocker.style.opacity = "0.56";
    titleBar = document.querySelector('#title-bar');
    titleBar.style.opacity = "0.54";

    cardClone.classList.add('is-playing');
    cardClone.classList.remove('is-about-to-play');

    //Play the video.
    setTimeout(()=>{
      thumbnail.controls = true;
      thumbnail.focus();
      thumbnail.play();
    }, 900);
  }, 100);
}


document
  .querySelectorAll('.video')
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

  document.querySelector('.close-video')
    .style.display = 'none';

  thumbnail.pause();
  thumbnail.controls = false;
  clickBlocker.style.opacity = "0";
  titleBar.style.opacity = "initial";

  setInitialClonePosition(card);
  cardClone.classList.add('is-closing');
  cardClone.classList.remove('is-playing');

  setTimeout(()=>{
    card.style.opacity = '1';
    componentRoot.removeChild(cardClone);
    card.focus();
    cardClone = null;
    clickBlocker.style.display = "none";
  }, 1100);
}


function Videos(props) {
  useEffect(()=> {
    electronApp = window.electron.remote.app;
  });

  const {folders} = props;

  if (!folders) return null;

  if (folders.length < 1) {
    window.alert(
      `No supported videos found in the default Videos directory.
      ${electronApp.getPath('videos')}`
    );
    return null;
  }

  return (
    <main id="videos">
      {
        folders.map((folder)=> {
          return (
            <VideoGroup 
              key={folder.path}
              folder={folder} 
              loadVideo={loadVideo}>
            </VideoGroup>
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
    </main>
  );
}

export default Videos;
