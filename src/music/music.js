import React from 'react';
import './music.scss';

const { useState, useEffect } = React;

let player;

function Music(props) {
  let { files } = props;

  let [ nowPlaying, setNowPlaying ] = useState('C:/Users/Stac/Music/Avicii/Avicii_Wake_Me_Up.mp3');

  useEffect(()=> {
    player = document.querySelector('main#music .player');
  });

  let play = (filePath)=> {
    console.log(filePath);
    setNowPlaying(filePath);
    //player.play();
  }

  return (
    <main id="music">
      {
        files.map((file)=> { 
          return (
            <p key={file.path}
               onClick={()=> play(file.path)}>
              <span>{file.name}</span>
              <span>{file.path}</span>
            </p>
          )
        })
      }

      <audio 
        controls
        className="player"
        >
        <source src={nowPlaying} />
      </audio>);
    </main>
  );
}

export default Music;
