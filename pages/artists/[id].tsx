import {
  Container,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Link
} from '@chakra-ui/react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { prisma } from '../../lib/prisma';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const artist = await prisma.artist.findFirst({
    include: {
      albums: {
        include: { songs: true }
      }
    },
    where: { id: Number(params.id) }
  });

  return {
    props: {
      artist,
      albums: artist.albums
    }
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const artists = await prisma.artist.findMany();

  return {
    paths: artists.map((artist) => ({
      params: {
        id: artist.id.toString()
      }
    })),
    fallback: false
  };
};

export default ({ artist, albums }) => {
  return (
    <>
      <Head>
        <title>{artist.name}</title>
        <meta property="og:title" content={artist.name} key="title" />
        <meta
          property="og:description"
          content={`Albums by ${artist.name}: 
          ${albums.map((album) => album.name).join(', ')}`}
          key="description"
        />
      </Head>
      <Container maxW="container.md" mb={10}>
        <Table
          variant="striped"
          colorScheme="gray"
          className="table-auto w-full"
        >
          <Thead className="">
            <Tr className="text-left">
              <Th>Album</Th>
              <Th>Artist</Th>
              <Th>Link</Th>
            </Tr>
          </Thead>
          <Tbody>
            {albums?.map((album) => (
              <Tr key={album.id} className="">
                <Td>{album.name}</Td>
                <Td>{artist.name}</Td>
                <Td>
                  <NextLink href={`/albums/${album.id}`} passHref>
                    <Link>Listen</Link>
                  </NextLink>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Container>
    </>
  );
};
