import { GetStaticProps } from 'next';
import React from 'react';
import NextLink from 'next/link';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  Container
} from '@chakra-ui/react';
import { VideoJS } from '../components/VideoJS';
import { prisma } from '../lib/prisma';

export const getStaticProps: GetStaticProps = async () => {
  const albums = await prisma.album.findMany({
    include: { Artist: true }
  });
  return {
    props: {
      albums
    }
  };
};

export default ({ albums }) => {
  return (
    <Container maxW="container.md" mb={10}>
      <Table variant="striped" colorScheme="gray" className="table-auto w-full">
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
              <Td>{album.Artist.name}</Td>
              <Td>
                <NextLink href={`/albums/${album.id}`} passHref>
                  <Link color="purple.500">Listen</Link>
                </NextLink>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Container>
  );
};
