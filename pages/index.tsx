import { GetStaticProps } from 'next';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {
      songs: [
        {
          id: 1,
          name: 'Test Song'
        }
      ]
    }
  };
};

export default ({ songs }) => (
  <ul>
    {songs?.map((song) => (
      <li key={song.id}>{song.name}</li>
    ))}
  </ul>
);
