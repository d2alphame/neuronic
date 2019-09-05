import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
//import * as serviceWorker from './serviceWorker'; serviceWorker.unregister();

import Titlebar from './titlebar/titlebar';
import Tabbar from './tabbar/tabbar';
import Sidebar from './sidebar/sidebar';
import Videos from './videos/videos';
import Music from './music/music';
import Photos from './photos/photos';
import Settings from './settings/settings';
import About from './about/about';

console.warn(`Neuronic v1.0.0 - Beta.
Created by Stac
https://feranmi.name.ng

Package home page:
https://www.npmjs.com/package/sky-stream`);

let electron = window.require("electron");
var ipc = electron.ipcRenderer,
    thisWindow = electron.remote.getCurrentWindow();

window.electron = electron;
window.ipc = ipc; //Expose these variables...
window.thisWindow = thisWindow //...to the iframe.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'videos',
      videoFolders: null,
      musicFiles: null
    };

    ipc.on('videos-fetched', this.onVidsFetched);
    ipc.on('music-fetched', this.onMusicFetched);
    ipc.on('error', (event, errorMessage) => {
      let errorText = document.createElement("p")
      errorText.innerHTML = "ERROR:- " + errorMessage;
      document.documentElement.prepend(errorText);
    });
  }

  onVidsFetched = (event, folders)=> {
    this.setState({
      videoFolders: folders
    });
  }

  onMusicFetched = (event, files)=> {
    this.setState({
      musicFiles: files
    });
  }

  switchView = (target)=> {
    this.setState({
      view: target
    })
  }
  
  getContent = (targetView, props={})=> {
    switch (targetView) {
      case 'videos':
        return <Videos {...props}
                  folders={this.state.videoFolders}
                />

      case 'music':
        return <Music {...props}
                  files={this.state.musicFiles}
               />;

      case 'photos':
        return <Photos {...props} />;

      case 'settings':
        return <Settings {...props} />;

      case 'about':
        return <About {...props} />;
        
      default:
        return <p>Something went wrong switching the view.</p>;
    }  
  }

  render() {
    const currentView = this.state.view;
    return (
      <div className="app">
        <Titlebar />

        <Tabbar
          currentView={currentView}
        />

        <Sidebar 
          switchView={this.switchView}
          currentView={currentView}
        />

        {this.getContent(currentView)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

//Disable drag and drop.
document.ondragstart = (event)=> {
  if (!event.target.classList.contains('draggable')){
    event.preventDefault();
    return false;
  }
}
