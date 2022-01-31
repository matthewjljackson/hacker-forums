import type { NextPage } from 'next';
import { feedQuery } from '../graphql/client-queries';
import apolloClient from '../utils/apollo';
import { ILink } from '../utils/interfaces';
import LinkList from '../components/LinkList';
import NewLinkModal from '../components/NewLinkModal';

const Home: NextPage<HomeProps> = ({ feed }) => {
  // const x = localStorage.getItem('token');
  // console.log('voila', sessionStorage.getItem('token'));
  return (
    <div className="flex flex-col justify-center">
      <LinkList links={feed.links} />
      <NewLinkModal />
    </div>
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
