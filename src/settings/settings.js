import React from 'react';
import './settings.scss';

const { useEffect } = React;
let appWindow, ipc;

function Settings() {
  useEffect(()=> {
    const electron = window.electron;
    appWindow = electron.remote.getCurrentWindow();
    ipc = electron.ipcRenderer;
  })

  return (
    <main id="settings">
      <button
          onClick={()=> appWindow.toggleDevTools()}
        >
        Toggle Developer Tools
      </button>

      <button
          onClick={()=> ipc.send('reload')}
        >
        Refresh App
      </button>
    </main>
  );
}

export default Settings;
