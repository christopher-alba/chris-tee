import { ApolloClient, InMemoryCache } from '@apollo/client';

let uri = 'http://localhost:3000/graphql';
if (process.env.NODE_ENV === 'production') {
  uri = '/graphql';
}

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: uri,
});
