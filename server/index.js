const server = require('./server')
const { graphqlHTTP } = require('express-graphql')
const { gql } = require('@apollo/client')
const { resolve } = require('path')
const { makeExecutableSchema } = require('graphql-tools')
const { readFileSync } = require('fs')
const { resolvers } = require('./graphql/resolvers/resolvers')
const { getPayload } = require('./util')
require('./mongoose/connect')

const typeDefs = gql(
  readFileSync(resolve('./server/graphql/schema.graphql'), {
    encoding: 'utf8'
  })
)

const schema = makeExecutableSchema({
  typeDefs
})

server.use(
  '/graphql',
  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: () => {
      // get the user token from the headers
      const token = req.headers.authorization || ''
      // try to retrieve a user with the token
      const { payload: user, loggedIn } = getPayload(token)
      // add the user to the context
      return { user, loggedIn }
    }
  }))
)

const port = process.env.PORT || 3000

server.listen(port, function () {
  // eslint-disable-next-line no-console
  //console.log('Listening on port', port);
})
