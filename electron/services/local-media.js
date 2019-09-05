const fs = require('fs'),
      path = require("path"),
      electron = require('electron');

const app = electron.app;

class LocalMedia {
  /**Search local disks for media files. 
   * @param {string[]} dirList List of folders to check for media files. 
   * Searches sub-folders as well.
   * @param {string[]} dirExcludeList List of subfolders to be excluded from search.
   * @param {string[]} extList List of file extensions to look for.
   */
  static getVideos(
      dirList = [app.getPath('videos')],
      dirExcludeList = [],
      extList = ['.mp4', '.mkv']
    ) {
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
          localFileDirs = localFileDirs.concat(this.getVideos([filePath], dirExcludeList, extList));
        
        else for (let ext of extList) {
          if (fileName.lastIndexOf(ext) === fileName.length - ext.length) {
            localFileDirs[dirIndex].files.push({path: filePath, name: fileName});
            break;
          }
        }
      }
    }
    return localFileDirs;
  }

  static getMusic(
      dirList = [app.getPath('music')],
      dirExcludeList = [],
      extList = ['.mp3', 'aac', 'ogg']
    ) {
    
    var files = [];

    for (let i of dirList) {
      if (!fs.existsSync(i)) {
        console.log(`The Folder "${i}" was not found`);
        continue;
      }

      let dir = fs.readdirSync(i);

      for (let fileName of dir) {
        let filePath = path.join(i, fileName)

        if (fs.lstatSync(filePath).isDirectory() && !dirExcludeList.includes(filePath))
          //Use recursion to search subfolders.
          files = files.concat(this.getMusic([filePath], dirExcludeList, extList));
        
        else for (let ext of extList) {
          if (fileName.lastIndexOf(ext) === fileName.length - ext.length) {
            files.push({path: filePath, name: fileName});
            break;
          }
        }
      }
    }
    return files;
  }
}

module.exports = LocalMedia;