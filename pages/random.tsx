import { GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Button, Heading } from '@chakra-ui/react';
import { prisma } from '../lib/prisma';
import React from 'react';
import Head from 'next/head';
import { VideoJS } from '../components/VideoJS';

export const getStaticProps: GetStaticProps = async () => {
  const songs =
    await prisma.$queryRaw`SELECT * from Song ORDER BY RANDOM() LIMIT 20`;

  return {
    props: {
      songs: songs
    }
  };
};

export default ({ songs }) => {
  const playerRef = React.useRef(null);

  const videoJsOptions = {
    // lookup the options in the docs for more options
    autoplay: true,
    controls: false,
    responsive: true,
    fluid: false
  };

  const handlePlayerReady = (player) => {
    playerRef.current = player;

    let list = [];
    songs.map((song) => {
      list.push({
        name: song.name,
        description: song.name,
        sources: [
          {
            src: `https://www.youtube.com/embed/${song.youtubeId}`,
            type: 'video/youtube'
          }
        ]
      });
    });

    player.playlist(list);

    // Play through the playlist automatically.
    player.playlist.autoadvance(0);

    // Initialize the playlist-ui plugin
    player.playlistUi();

    // you can handle player events here
    player.on('waiting', () => {
      console.log('player is waiting');
    });

    player.on('dispose', () => {
      console.log('player will dispose');
    });
  };

  return (
    <>
      <Head>
        <title>Random Songs - Various Artists</title>
        <meta
          property="og:title"
          content={`Various Artists - Random Songs`}
          key="title"
        />
        <meta
          property="og:description"
          content={`Songs of Various Artists from different albums`}
          key="description"
        />
      </Head>
      <Box mt={8}>
        <Heading className="title-font font-extrabold text-4xl text-center mb-8">
          Random Songs
        </Heading>
        <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
        <NextLink href="/" passHref>
          <Button as="a" m={8}>
            Back
          </Button>
        </NextLink>
      </Box>
    </>
  );
};
