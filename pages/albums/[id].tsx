import { GetStaticPaths, GetStaticProps } from 'next';
import NextLink from 'next/link';
import { Box, Button, Heading } from '@chakra-ui/react';
import { prisma } from '../../lib/prisma';
import React from 'react';
import Head from 'next/head';
import { VideoJS } from '../../components/VideoJS';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const album = await prisma.album.findFirst({
    include: { Artist: true, songs: true },
    where: { id: Number(params.id) }
  });

  return {
    props: {
      album_name: album.name,
      arist_name: album.Artist.name,
      songs: album.songs
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const albums = await prisma.album.findMany();

  return {
    paths: albums.map((album) => ({
      params: {
        id: album.id.toString()
      }
    })),
    fallback: false
  };
};

export default ({ album_name, arist_name, songs }) => {
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
        description: `${album_name} - ${song.name}`,
        duration: song.duration,
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
        <title>
          {arist_name} - {album_name}
        </title>
        <meta
          property="og:title"
          content={`${arist_name} - ${album_name}`}
          key="title"
        />
        <meta
          property="og:description"
          content={`Songs of ${arist_name} from ${album_name} album`}
          key="description"
        />
      </Head>
      <Box mt={8}>
        <Heading className="title-font font-extrabold text-4xl text-center mb-8">
          {arist_name}
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
