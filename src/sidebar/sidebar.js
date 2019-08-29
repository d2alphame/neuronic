import React from 'react';
import './sidebar.scss';

class Sidebar extends React.Component {
  render() {
    return (
      <div className="sideBar">
        <div className="sidebar-top">
          <div className="sidebar-icons selected-sidebar-icon videos-icon">
            <img src="./icons/Sidebar/videos.png" alt='' />
          </div>
          <div className="sidebar-icons audios-icon">
            <img src="/icons/Sidebar/songs.png" alt='' />
          </div>
          <div className="sidebar-icons photos-icon">        
            <img src="/icons/Sidebar/photos1.png" alt='' />
          </div>
        </div>

        <div className="sidebar-bottom">
          <div className="sidebar-icons settings-icon">        
            <img src="/icons/Sidebar/settings1.png" alt='' />
          </div>
          <div className="sidebar-icons info-icon">        
            <img src="/icons/Sidebar/info1.png" alt='' />
          </div>
        </div>
      </div>
    );
  };
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