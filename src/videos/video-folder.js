import React from 'react';
import VideoCard from './video-card';

function VideoGroup(props) {
  const {folder} = props;

  return (
    <section className='video-group'>
      <h4 className='video-group__title'>
        {folder.name}
      </h4>

      <div className='video-group__wrapper'>
        {
          folder.files.map((file, index)=> {
            return (
              <VideoCard 
                key={file.path}
                path={file.path} 
                name={file.name} 
                id={`vid-${folder.name.replace(/[.\s]/g, '_')}-${index}`}
                loadVideo={props.loadVideo}>
              </VideoCard>
            );
          })
        }
      </div>
    </section>
  )
}

export default VideoGroup;