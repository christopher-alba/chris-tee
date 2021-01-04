import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: '/graphql',
  headers: {
    authorization: localStorage.getItem('authorization'),
  },
});
