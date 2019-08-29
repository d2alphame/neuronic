import React from 'react';
import VideoCard from './video-card';

function VideoFolder(props) {
  const {folder} = props;

  return (
    <section className='video-group'>
      <h4>
        {folder.name}
      </h4>

      <div className='inline-blocks-wrapper'>
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

export default VideoFolder;