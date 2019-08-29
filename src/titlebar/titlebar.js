import React from 'react';
import './titlebar.scss';

class Titlebar extends React.Component {
  render() {
    return (
      <header className="titleBar">
        <div className="appIconDiv">
          <img className="appIcon" src="./icons/app/mainraw.png" alt='' />
        </div>

        <h2 className="appTitle"> Neuronic 
          <a href="https://feranmi.name.ng" target="_blank" rel="noopener noreferrer">
            - by Stac
          </a>
        </h2>

        <div className="closeBtn windowButtons">
          <img className="closeImg windowButtonsImg" alt='' src="./icons/close/initial.png" />
        </div>
        <div className="maximizeBtn windowButtons">
          <img className="maximizeImg windowButtonsImg" alt='' src="./icons/maximize/initial.png" />
        </div>
        <div className="minimizeBtn windowButtons">
          <img className="minimizeImg windowButtonsImg" alt='' src="./icons/minimize/initial.png" />
        </div>
      </header>
    );
  };
}
/*
var maxicon = "./icons/maximize/initial.png", //Maximize icon, to be shown when window is at initial size.
    resticon = "./icons/restore/initial.png", //Restore icon, to be show when window is maximized.
    windowButtons = document.querySelectorAll(".windowButtons");

//windowButtons event listeners. 
for  (let x=0; x<windowButtons.length; x++){
  windowButtons[x].onmouseover = (e)=>{
    //Highlight the button
    e.currentTarget.style.backgroundColor = "rgb(234, 43, 110)";
    //Point to the img within the div
    let selector = "#" + e.currentTarget.id + " img";
    //Creat path to white icon
    let newimg = document.querySelector(selector).src.replace(/initial/, "onhover");
    //Switch the icon
    document.querySelector(selector).src = newimg;
    /*Scale down maximize icon.
    if (e.currentTarget.id == "maximizeBtn"){ //Scale down the white img.
      document.getElementById("maximizeImg").style.height = "13px";
      document.getElementById("maximizeImg").style.width = "13px";
    }*\/
  }
  windowButtons[x].onmouseout = (e)=>{
    //Remove background color
    e.currentTarget.style.backgroundColor = "transparent";
    //Point to img within div
    let selector = "#" + e.currentTarget.id + " img";
    //Create path to colored icon.
    let newimg = document.querySelector(selector).src.replace(/onhover/, "initial");
    //Switch the icon.
    document.querySelector(selector).src = newimg;
    //Restore default maximize icon size.
    if (e.currentTarget.id === "maximizeBtn"){
     document.getElementById("maximizeImg").style.height = "15px";
     document.getElementById("maximizeImg").style.width = "15px";
    }
  }
}

document.querySelector("#minimizeBtn").onclick = (event)=>{
  //Point to the img within the div.
  let selector = "#" + event.currentTarget.id + " img";
  //Create path to colored icon.
  let newimg = document.querySelector(selector).src.replace(/onhover/, "initial");
  //Change icon.
  document.querySelector(selector).src = newimg;
  //Remove background color.
  event.currentTarget.style.backgroundColor = "transparent";
  //Finally, do the thing!
  setTimeout(thisWindow.minimize, 300);
}

var windowIsMaximized;
document.querySelector("#maximizeBtn").onclick = (e)=>{
  //Remove background color after click event.
  e.currentTarget.style.backgroundColor = "transparent";
  //console.log(thisWindow.isMaximized()); Error: method seems to always return false. Using my own variable instead.
  if (!windowIsMaximized) {
    //Maximize the window.
    thisWindow.maximize();
    windowIsMaximized = true;
    thisWindow.setResizable(false); //Prevent maximized window from being resized manually.
    //Point to the img within the div
    let selector = "#" + e.currentTarget.id + " img";
    //Change maximmize icon to restore icon.
    document.querySelector(selector).src = resticon;
    document.querySelector('body').style.border = 'none';
  }
  else {
    //Restore window to initial size.
    thisWindow.unmaximize();
    windowIsMaximized = false;
    thisWindow.setResizable(true);
    //Point to the img within the div
    let selector = "#" + e.currentTarget.id + " img";
    //Change restore icon to maximmize icon.
    document.querySelector(selector).src = maxicon;
    document.querySelector('body').style.border = '1px solid rgb(255, 3, 129)';
  }
}

document.querySelector("#closeBtn").onclick = (e)=>{
  //Remove background color after click event.
  e.currentTarget.style.backgroundColor = "transparent";
  setTimeout(thisWindow.close, 300);
  /**Consider minimize window, then countdown to allow undo before finally closing.*\/
}*/

export default Titlebar;