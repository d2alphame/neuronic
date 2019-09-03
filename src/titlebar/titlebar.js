import React from 'react';
import './titlebar.scss';
import WindowButtons from './window-buttons';

class Titlebar extends React.Component {
  render() {
    return (
      <header id="title-bar">
        <div className="app-icon">
          <img className="app-icon__img" alt=''
               src="./icons/app/mainraw.png" />
        </div>

        <h2 className="app-title">
          Neuronic 
          <a href="https://feranmi.name.ng"
             className="app-title__author-link"
             target="_blank" rel="noopener noreferrer">
            - by Stac
          </a>
        </h2>

        <WindowButtons></WindowButtons>
      </header>
    );
  }
}

export default Titlebar;