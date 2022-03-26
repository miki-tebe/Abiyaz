// import usetube from 'usetube';
var usetube = require('usetube');
import { prisma } from '../lib/prisma';

// fill in the playlist id and album name before running the script
const ArtistName = 'Various Artists';
const AlbumName = 'IAAM Vol.1 | ኢያም ቁ.1';
const PlaylistID = 'PLdUuUCoUMoogVClbRjpIzg7LDI7vU6R9';

// run test to check if the title of the song is the same as the title of the video
async function test() {
  let result = await usetube.getPlaylistVideos(PlaylistID);
  let formatted_result = result.map((video) => {
    return `youtubeId: ${video.id}, name: ${video.original_title}, duration: ${video.duration}`;
  });

  console.log(formatted_result);
}
// test();

async function main() {
  let result = await usetube.getPlaylistVideos(PlaylistID);
  if (result) {
    const albums = await prisma.album.create({
      data: {
        name: AlbumName,
        Artist: {
          create: {
            name: ArtistName
          }
        },
        songs: {
          create: result.map((video) => ({
            youtubeId: video.id,
            name: video.original_title,
            duration: video.duration
          }))
        }
      }
    });
    console.log({ albums });
  } else {
    throw new Error(`Cannot get get playlist ${PlaylistID}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
