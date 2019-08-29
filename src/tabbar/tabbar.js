import React from 'react';
import './tabbar.scss';

class Tabbar extends React.Component {
  render() {
    return (
      <section className="tabs-section">
        <p className="tabs video-tabs">
          <span className="videos-tab"> Videos </span>
        </p>

        <p className="tabs music-tabs" style={{display:'none'}}>
          <span className="all-songs-tab"> All Songs </span>
          <span className="albums-tab"> Albums </span>
          <span className="artists-tab"> Artists </span>
          <span className="playlists-tab"> Playlists </span>
          <span className="genres-tab"> Genres </span>
        </p>

        <p className="tabs photo-tabs" style={{display:'none'}}>
          <span className="photo-albums-tab"> Photo Albums </span>
          <span className="all-photos"> All Photos </span>
        </p>

        <p className="tabs info-tabs" style={{display:'none'}}>
          <span className="about-tab"> About </span>
        </p>

        <p className="tabs settings-tabs" style={{display:'none'}}>
          <span className="app-settings-tab"> App Settings </span>
        </p>

        <p className="tabs account-tabs" style={{display:'none'}}>
          <span className="myAccount-tab"> My Account </span>
        </p>
      </section>
    );
  };
}

/*var tabs = document.querySelectorAll(".tabs > span");
var currentTab = document.querySelector("#videos-tab");
tabs.forEach((tab)=>tab.onclick = (e)=>switchTab(e.currentTarget));

function switchTab(clickedTab){
  //restore the currently selected tab to default styles.
  currentTab.style.padding = "5px 10px 0 10px";
  currentTab.style.float = "left";
  currentTab.style.color = "rgba(255, 255, 255, 0.226)";
  currentTab.style.border = "none";
  currentTab.style.marginBottom = "initial";

  //Highlight the newly selected tab.
  clickedTab.style.color = "rgba(255, 255, 255, 0.8)";
  clickedTab.style.border = "1px solid rgba(0, 0, 0, 0.5)";
  clickedTab.style.borderBottom = "none";
  clickedTab.style.marginBottom = "-1px";

  currentTab = clickedTab;
}*/

export default Tabbar;