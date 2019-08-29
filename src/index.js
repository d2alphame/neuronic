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

var electron = window.require("electron"),
    ipc = electron.ipcRenderer,
    thisWindow = electron.remote.getCurrentWindow();

window.ipc = ipc; //Expose these variables...
window.thisWindow = thisWindow //...to the iframe.

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'videos',
      videoFolders: null
    };

    ipc.on('videos-fetched', this.onVidsFetched);
  }

  onVidsFetched = (event, folders)=> {
    this.setState({
      videoFolders: folders
    });
  }
  
  getContent = (currentView)=> {
    switch (currentView) {
      case 'videos':
        return <Videos folders={this.state.videoFolders} electron={electron}></Videos>;
      case 'music':
        return <Music></Music>;
      case 'photos':
        return <Photos></Photos>;
      case 'settings':
        return <Settings></Settings>;
      case 'about':
        return <About></About>;
      default:
        return;
    }  
  }

  render() {
    const currentView = this.state.view;
    return (
      <div className="app">
        <Titlebar></Titlebar>
        <Tabbar></Tabbar>
        <Sidebar></Sidebar>
        <main>
          {this.getContent(currentView)}
        </main>
        <iframe title="other-sections" className="other-sections" src=""></iframe>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));

//Disable drag and drop.
document.ondragstart = (event)=>{
  if (!event.target.classList.contains('draggable')){
    event.preventDefault();
    return false;
  }
}

ipc.on('error', (event, errorMessage) => {
  let errorText = document.createElement("p")
  errorText.innerHTML = "ERROR:- " + errorMessage;
  document.documentElement.appendChild(errorText);
});
