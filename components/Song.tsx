import React from 'react';
import { Text } from '@chakra-ui/react';

export const Song = ({ song, album_name }) => {
  return (
    <div className="mb-4 mx-8">
      <Text color="grey.700" mb={2}>
        {album_name} - {song.name}
      </Text>
      <iframe
        src={`https://www.youtube.com/embed/${song.youtubeId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
};
