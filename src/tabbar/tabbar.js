import React from 'react';
import './tabbar.scss';

const { useState, useEffect } = React;

let currentTabs, setCurrentTabs;

const defaultTabs = {
  videos: 0,
  music: 0,
  photos: 0,
  about: 0,
  settings: 0
}

function switchTab(view, tabIndex) {
  setCurrentTabs({
    ...currentTabs,
    [view]: tabIndex
  })
}

const viewTabs = {
  videos: [
    <button className="tab" data-tab-index="0"
            onClick={()=> switchTab('videos', 0)}
            key={0}>
      Videos
    </button>
  ],
  music: [
    <button className="tab" data-tab-index="0"
            onClick={()=> switchTab('music', 0)}
            key={0}> 
      All Songs
    </button>,
    <button className="tab" data-tab-index="1"
            onClick={()=> switchTab('music', 1)}
            key={1}>
      Albums
    </button>,
    <button className="tab" data-tab-index="2"
            onClick={()=> switchTab('music', 2)}
            key={2}>
      Artists
    </button>,
    <button className="tab" data-tab-index="3"
            onClick={()=> switchTab('music', 3)}
            key={3}>
      Playlists
    </button>,
    <button className="tab" data-tab-index="4"
            onClick={()=> switchTab('music', 4)}
            key={4}>
      Genres
    </button>
  ],
  photos: [
    <button className="tab" data-tab-index="0"
            onClick={()=> switchTab('photos', 0)}
            key={0}>
      Photo Albums
    </button>,
    <button className="tab" data-tab-index="1"
            onClick={()=> switchTab('photos', 1)}
            key={1}>
      All Photos
    </button>
  ],
  about: [
    <button className="tab" data-tab-index="0"
            onClick={()=> switchTab('about', 0)}
            key={0}>
      About
    </button>
  ],
  settings: [
    <button className="tab" data-tab-index="0"
            onClick={()=> switchTab('photos', 0)}
            key={0}>
      App Settings
    </button>
  ]
}

function Tabbar(props) {
  let { currentView } = props;
  [currentTabs, setCurrentTabs] = useState(defaultTabs);

  useEffect(()=> {
    let previousTab = document
      .querySelector('#tabbar .tab.is-current-tab');

    if (previousTab)
      previousTab
        .classList
        .remove('is-current-tab');

    document
      .querySelector(`#tabbar .tab[data-tab-index="${currentTabs[currentView]}"]`)
      .classList.add('is-current-tab');
  });

  return (
    <nav id="tabbar">
      { viewTabs[currentView] }
    </nav>
  );
}

export default Tabbar;