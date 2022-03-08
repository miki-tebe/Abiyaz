import React from 'react';
import videojs from 'video.js';
import 'videojs-playlist';
import 'videojs-youtube';
import 'videojs-playlist-ui';
import 'video.js/dist/video-js.css';
import 'videojs-playlist-ui/dist/videojs-playlist-ui.css';
import { Box, Center } from '@chakra-ui/react';

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
    <Box m={8} className="player-container">
      <Center>
        <video
          id="vid1"
          ref={videoRef}
          width="480"
          height="315"
          controls
          autoPlay
          className="video-js vjs-default-skin pt-8"
          data-setup='{ "techOrder": ["youtube"], "sources": [{ "type": "video/youtube", "youtube": { "ytControls": 2 } }'
        ></video>
      </Center>
      <div className="vjs-playlist m-8 p-8"></div>
    </Box>
  );
};
