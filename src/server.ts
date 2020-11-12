import { ApolloServer } from 'apollo-server';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';

function createLocalServer() {
  return new ApolloServer({
    typeDefs,
    resolvers,
  });
}

export { createLocalServer };
