const path = require("path"),
      electron = require("electron"),
      LocalMedia = require('./services/local-media.js');

const app = electron.app,
      ipc = electron.ipcMain,
      BrowserWindow = electron.BrowserWindow;

let mainWindow;

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

const createWindow = (frontend)=> {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 650,
    frame: false,
    backgroundColor: "#ff038188",
    icon: path.join(__dirname, '../public/icons/app/main.ico'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false,
      preload: path.join(__dirname, 'preload.js')
    }
  });

  mainWindow.loadURL(frontend);

  mainWindow.webContents.on('dom-ready', ()=>{
    //mainWindow.webContents.openDevTools();
    let localVideos = LocalMedia.getVideos();
    let localMusic = LocalMedia.getMusic();

    mainWindow.webContents.send('videos-fetched', localVideos);
    mainWindow.webContents.send('music-fetched', localMusic);
  });

  mainWindow.on('closed', ()=> {  
    // mainWindow = null;
    app.quit();
  });
};

module.exports = (env)=> {
  const port = env === 'dev' ? 3000
    : require('./server.js').port;

  const frontend = `http://localhost:${port}`;

  app.on('ready', ()=> createWindow(frontend));

  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow(frontend);
    }
  });

  ipc.on('reload', ()=>{mainWindow.loadURL(frontend)});
};
