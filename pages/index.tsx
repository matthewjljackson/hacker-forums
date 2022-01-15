import type { NextPage } from 'next';
import { feedQuery } from '../graphql/client-queries';
import apolloClient from '../utils/apollo';
import { ILink } from '../utils/interfaces';
import LinkList from '../components/LinkList';

const Home: NextPage<HomeProps> = ({ feed }) => {
  return (
    <>
      <LinkList links={feed.links} />
    </>
  );
};

export default Home;

export async function getServerSideProps() {
  const response = await apolloClient.query({
    query: feedQuery,
  });
  return {
    props: {
      feed: response.data.feed,
    },
  };
}

interface HomeProps {
  feed: {
    count: number;
    links: ILink[];
  };
}
