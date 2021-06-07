const server = require("./server");
const cors = require("cors");
const { graphqlHTTP } = require("express-graphql");
const { gql } = require("@apollo/client");
const { resolve } = require("path");
const { makeExecutableSchema } = require("graphql-tools");
const { readFileSync } = require("fs");
const { resolvers } = require("./graphql/resolvers/resolvers");
const { getPayload } = require("./util");
const express = require("express");
require("./mongoose/connect");

const typeDefs = gql(
  readFileSync(resolve("./server/graphql/schema.graphql"), {
    encoding: "utf8",
  })
);

const schema = makeExecutableSchema({
  typeDefs,
});

server.use(cors());
server.use(express.json({limit: '50mb'}));
server.use(express.urlencoded({limit: '50mb', extended: true, parameterLimit:1000000}));
server.use(
  "/graphql",
  graphqlHTTP((req) => ({
    schema,
    rootValue: resolvers,
    graphiql: true,
    context: () => {
      // get the user token from the headers
      const token = req.headers.authorization || "";
      // try to retrieve a user with the token
      const { payload: user, loggedIn } = getPayload(token);
      // add the user to the context
      return { user, loggedIn };
    },
  }))
);

const port = process.env.PORT || 3000;

server.listen(port, function () {
  // eslint-disable-next-line no-console
  //console.log('Listening on port', port);
});
