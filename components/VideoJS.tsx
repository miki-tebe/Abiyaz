import React from 'react';
import videojs from 'video.js';
import 'videojs-playlist';
import 'videojs-youtube';
import 'videojs-playlist-ui';
import 'video.js/dist/video-js.min.css';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css';
import { SimpleGrid } from '@chakra-ui/react';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null);
  const playerRef = React.useRef(null);
  const { options, onReady } = props;

  React.useEffect(() => {
    if (!playerRef.current) {
      const videoElement = videoRef.current;
      if (!videoElement) return;

      const player = (playerRef.current = videojs(videoElement, options, () => {
        console.log('player is ready');
        onReady && onReady(player);
      }));
    }
  });
  return (
    <SimpleGrid
      columns={2}
      m={4}
      minChildWidth="480px"
      className="player-container items-start"
    >
      <video
        id="vid1"
        ref={videoRef}
        width="480"
        height="315"
        autoPlay
        className="video-js vjs-default-skin vjs-big-play-centered"
        data-setup='{ "youtube": { "ytControls": 2 } }'
      ></video>
      <div className="vjs-playlist self-start"></div>
    </SimpleGrid>
  );
};
