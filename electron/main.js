#!/usr/bin/env electron

const fs = require('fs'),
      //util = require('util'),
      //url = require("url"),
      path = require("path"),
      electron = require("electron"),
      app = electron.app,
      ipc = electron.ipcMain,
      BrowserWindow = electron.BrowserWindow;

//electron-packager . sky-stream --platform=mas --arch=x64 --asar --app-copyright="(c)2018 Stac Apps" --icon=./icons/app/main.icns --app-bundle-id=com.stac.mediaplayer --app-category-type=public.app-category.media-player --overwrite
/*var appPaths = 'getPath("userData") = ' + app.getPath('userData') +
  '\ngetAppPath() = ' + app.getAppPath() +
  '\ngetPath("videos") = ' + app.getPath('videos') +
  '\ngetPath("exe") = ' + app.getPath('exe') +
  '\nTOKEN_PATH = ' + TOKEN_PATH;
*/

var mainWindow;

app.on('ready', function(){
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 650,
    frame: false,
    //thickFrame: true, //default is true.
    backgroundColor: "#ff038188",
    icon: path.join(__dirname, '../public/icons/app/main.ico'),
    webPreferences: {
      nodeIntegration: true,
      webSecurity: false
      //preload: __dirname + '/preload.js' //preload.js file=> window.ipcRenderer = require('electron').ipcRenderer;
    }
  });

  //mainWindow.loadURL(`file://${__dirname}/index.html`);
  mainWindow.loadURL('http://localhost:3000');

  mainWindow.webContents.on('dom-ready', ()=>{
    //mainWindow.webContents.send('showAppPaths', appPaths);
    mainWindow.webContents.openDevTools();

    ///Get Local files.
    let localVideos = getLocalMedia();
    console.log(`\nFound a total of 'unknown amount' local files in ${app.getPath('videos')}`);
    for (let i of localVideos) console.log(i);
    mainWindow.webContents.send('videos-fetched', localVideos);
  });
  mainWindow.on('close', ()=>app.quit());
});

app.on('window-all-closed', ()=>app.quit());

ipc.on('reload', ()=>{mainWindow.loadURL('http://localhost:3000')});

/**Search local disks for media files. 
 * @param {string[]} dirList List of folders to check for media files. 
 * Searches sub-folders as well.
 * @param {string[]} dirExcludeList List of subfolders to be excluded from search.
 * @param {string[]} extList List of file extensions to look for.
 */
function getLocalMedia(
    dirList = [app.getPath('videos')],
    dirExcludeList = [],
    extList = ['.mp4', '.mkv']
  )
  {
  var localFileDirs = [];

  for (let i of dirList) {
    if (!fs.existsSync(i)) {
      console.log(`The Folder "${i}" was not found`);
      continue;
    }

    localFileDirs.push({
      name: path.basename(i), 
      path: i, 
      files: []
    });
    let dirIndex = localFileDirs.length - 1;
    let dir = fs.readdirSync(i);

    for (let fileName of dir) {
      let filePath = path.join(i, fileName)

      if (fs.lstatSync(filePath).isDirectory() && !dirExcludeList.includes(filePath))
        //Use recursion to search subfolders.
        localFileDirs = localFileDirs.concat(getLocalMedia([filePath], dirExcludeList, extList));
      
      else {
        for (let ext of extList){
          if (fileName.lastIndexOf(ext) === fileName.length - ext.length) {
            localFileDirs[dirIndex].files.push({path: filePath, name: fileName});
            break;
          }
        }
      }
    }
  }

  return localFileDirs;
}