// import usetube from 'usetube';
var usetube = require('usetube');
import { prisma } from '../lib/prisma';

// fill in the playlist id and album name before running the script
const ArtistName = 'Aman';
const AlbumName = 'Jimir (EP)';
const PlaylistID = 'PL4EGtk3ytL1cbna0SeOldf8PggIFa_3_O';

// run test to check if the title of the song is the same as the title of the video
async function test() {
  let result = await usetube.getPlaylistVideos(PlaylistID);
  let formatted_result = result.map((video) => {
    return `youtubeId: ${video.id}, name: ${
      video.original_title.split(' - ')[1]
    }`;
  });

  console.log(formatted_result);
}
// test();

async function main() {
  let result = await usetube.getPlaylistVideos(PlaylistID);
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
          name: video.original_title
        }))
      }
    }
  });
  console.log({ albums });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
