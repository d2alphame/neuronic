#!/usr/bin/env electron

//electron-packager . sky-stream --platform=mas --arch=x64 --asar --app-copyright="(c)2018 Stac Apps" --icon=./icons/app/main.icns --app-bundle-id=com.stac.mediaplayer --app-category-type=public.app-category.media-player --overwrite

require('./app')('dev');
