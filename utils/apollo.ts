import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
  uri: 'http://localhost:3000/api/graphql',
  cache: new InMemoryCache(),
  // headers: {
  //   authorization: sessionStorage.getItem('token') || '',
  // }
});

export default apolloClient;
