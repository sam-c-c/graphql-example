import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDef as Book, resolvers as bookResolvers } from "./types/book.js";
import { typeDef as Rockets, resolvers as rocketResolvers } from "./types/rockets.js";
import pkg from 'lodash';
const { merge } = pkg;
// Set base query. All typeDefs will extend this.
const Query = `
  type Query {
    _empty: String
  }
`;
const resolvers = {};
// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
    typeDefs: [Query, Book, Rockets],
    resolvers: merge(resolvers, bookResolvers, rocketResolvers),
});
// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
    listen: { port: 3000 },
});
console.log(`🚀  Server ready at: ${url}`);
