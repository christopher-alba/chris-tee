const server = require('./server')
const cors = require('cors');
const { graphqlHTTP } = require('express-graphql');
const { gql } = require('@apollo/client');
const { resolve } = require('path');
const { makeExecutableSchema } = require('graphql-tools');
const { readFileSync } = require('fs');
const { resolvers } = require('./graphql/resolvers');
require('./mongoose/connect');

const typeDefs = gql(
  readFileSync(resolve('./server/graphql/schema.graphql'), {
    encoding: 'utf8',
  })
);

const schema = makeExecutableSchema({
  typeDefs,
});

server.use(cors());
server.use(
  '/graphql',
  graphqlHTTP({
    schema,
    rootValue: resolvers,
    graphiql: true,
  })
);

const port = process.env.PORT || 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  console.log('Listening on port', port)
})
