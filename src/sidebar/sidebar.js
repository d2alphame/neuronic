import React from 'react';
import './sidebar.scss';

const {useEffect} = React;

function Sidebar(props) {
  const {switchView, currentView} = props;

  useEffect(()=> {
    let previousSelection = document
      .querySelector('.sidebar-icon.is-selected');

    if (previousSelection)
      previousSelection
        .classList
        .remove('is-selected');

    document
      .querySelector(`.sidebar-icon.is-${currentView}`)
      .classList
      .add('is-selected');
  });

  return (
    <nav id="sidebar">
      <div className="sidebar-top">
        <img className="sidebar-icon is-videos"
             src="./icons/Sidebar/videos.png" alt=''
             onClick={()=> switchView('videos')} 
        />
        <img className="sidebar-icon is-music"
             src="/icons/Sidebar/songs.png" alt=''
             onClick={()=> switchView('music')}
        />       
        <img className="sidebar-icon is-photos"
             src="/icons/Sidebar/photos1.png" alt=''
             onClick={()=> switchView('photos')}
        />
      </div>

      <div className="sidebar-bottom">       
        <img className="sidebar-icon is-settings"
             src="/icons/Sidebar/settings1.png" alt=''
             onClick={()=> switchView('settings')}
        />
        <img className="sidebar-icon is-about" 
             src="/icons/Sidebar/info1.png" alt=''
             onClick={()=> switchView('about')}
        />
      </div>
    </nav>
  );
}
/*
var otherSections = document.querySelector("#other-sections"),
    //tabBars = document.querySelectorAll(".tabs"),
    currentTabsBar = document.querySelector("#video-tabs"),
    selectedSidebarIcon = videosIcon,
    contentWrapper = document.querySelector("#content-wrapper"),
    thisTabsBar;

videosIcon.onclick = (e)=>{
  otherSections.style.display = "none";
  contentWrapper.style.opacity = "1";
  currentTabsBar.style.display = "none";
  thisTabsBar = document.getElementById("video-tabs");
  thisTabsBar.style.display = "initial";
  currentTabsBar = thisTabsBar;
  switchTab(thisTabsBar.firstElementChild);

  selectedSidebarIcon.classList.remove('selected-sidebar-icon');
  videosIcon.classList.add('selected-sidebar-icon');
  selectedSidebarIcon = videosIcon;
}

audiosIcon.onclick = (e)=>{
  otherSections.style.display = "block";
  contentWrapper.style.opacity = "0";
  otherSections.src = "/WIP.html";
  currentTabsBar.style.display = "none";
  thisTabsBar = document.getElementById("music-tabs");
  thisTabsBar.style.display = "initial";
  currentTabsBar = thisTabsBar;
  switchTab(thisTabsBar.firstElementChild);

  selectedSidebarIcon.classList.remove('selected-sidebar-icon');
  audiosIcon.classList.add('selected-sidebar-icon');
  selectedSidebarIcon = audiosIcon;
}

photosIcon.onclick = (e)=>{
  otherSections.style.display = "block";
  contentWrapper.style.opacity = "0";
  otherSections.src = "/WIP.html";
  currentTabsBar.style.display = "none";
  thisTabsBar = document.getElementById("photo-tabs");
  thisTabsBar.style.display = "initial";
  currentTabsBar = thisTabsBar;
  switchTab(thisTabsBar.firstElementChild);

  selectedSidebarIcon.classList.remove('selected-sidebar-icon');
  photosIcon.classList.add('selected-sidebar-icon');
  selectedSidebarIcon = photosIcon;
}

infoIcon.onclick = (e)=>{
  otherSections.style.display = "block";
  contentWrapper.style.opacity = "0";
  otherSections.src = "/WIP.html";
  currentTabsBar.style.display = "none";
  thisTabsBar = document.getElementById("info-tabs");
  thisTabsBar.style.display = "initial";
  currentTabsBar = thisTabsBar;
  switchTab(thisTabsBar.firstElementChild);

  selectedSidebarIcon.classList.remove('selected-sidebar-icon');
  infoIcon.classList.add('selected-sidebar-icon');
  selectedSidebarIcon = infoIcon;
}

settingsIcon.onclick = (e)=>{
  otherSections.style.display = "block";
  contentWrapper.style.opacity = "0";
  otherSections.src = "/settings.html";
  currentTabsBar.style.display = "none";
  thisTabsBar = document.getElementById("settings-tabs");
  thisTabsBar.style.display = "initial";
  currentTabsBar = thisTabsBar;
  switchTab(thisTabsBar.firstElementChild);

  selectedSidebarIcon.classList.remove('selected-sidebar-icon');
  settingsIcon.classList.add('selected-sidebar-icon');
  selectedSidebarIcon = settingsIcon;
}*/

export default Sidebar;