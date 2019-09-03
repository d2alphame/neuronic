import React from 'react';
import "./window-buttons.scss";

let appWindow;
let maxState = false;

const { useEffect, useState } = React;

function WindowButtons () {
  let maximizeState = useState(false);

  useEffect(()=> {
    appWindow = window.electron.remote.getCurrentWindow()
  });

  return (
    <div id="window-buttons">
      <button className="window-button is-minimize"
              onClick={minimizeWindow}
              onMouseOver={useWhiteIcon}
              onMouseOut={useDefaultIcon}>
        <img alt='' src="./icons/minimize/initial.png" />
      </button>

      <button className="window-button is-maximize"
              onClick={()=> toggleFullSizeWindow(maximizeState)}
              onMouseOver={useWhiteIcon}
              onMouseOut={useDefaultIcon}>
        <img alt='' src="./icons/maximize/initial.png" />
      </button>
      
      <button className="window-button is-close"
              onClick={closeWindow}
              onMouseOver={useWhiteIcon}
              onMouseOut={useDefaultIcon}>
        <img alt='' src="./icons/close/initial.png" />
      </button>
    </div>
  )
}

function useWhiteIcon(event) {
  const icon = event.currentTarget.querySelector('img');
  icon.src = icon.src.replace(/initial/, "onhover");
}

function useDefaultIcon(event) {
  const icon = event.currentTarget.querySelector('img');
  icon.src = icon.src.replace(/onhover/, "initial");
}

function minimizeWindow() {
  appWindow.minimize();
}

function toggleFullSizeWindow(maximizeState) {
  console.log(maximizeState);
  //let isMaximized = maximizeState[0],
    //  setMaximized = maximizeState[1];

  //if (isMaximized) {
  if (maxState) {
    restoreWindow();
    //setMaximized(false);
    maxState = false;
  }
  else {
    maximizeWindow();
    //setMaximized(true);
    maxState = true;
  }
}

function maximizeWindow() {
  appWindow.maximize();
}

function restoreWindow() {
  console.log('restoreWindow called.');
  appWindow.unmaximize();
}

function closeWindow() {
  setTimeout(appWindow.close, 500);
}

export default WindowButtons;