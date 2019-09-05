#!/usr/bin/env electron

//electron-packager . sky-stream --platform=mas --arch=x64 --asar --app-copyright="(c)2018 Stac Apps" --icon=./icons/app/main.icns --app-bundle-id=com.stac.mediaplayer --app-category-type=public.app-category.media-player --overwrite

const path = require("path"),
      electron = require("electron"),
      LocalMedia = require('./services/local-media.js');

const app = electron.app,
      ipc = electron.ipcMain,
      BrowserWindow = electron.BrowserWindow,
      frontend = 'http://localhost:3000'; //`file://${__dirname}/index.html`

let mainWindow;

app.on('ready', function(){
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

  mainWindow.on('close', ()=>app.quit());
});

app.on('window-all-closed', ()=>app.quit());

ipc.on('reload', ()=>{mainWindow.loadURL(frontend)});
