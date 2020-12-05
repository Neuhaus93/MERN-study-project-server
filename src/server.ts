import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { PostsResolver } from './resolvers/posts.resolver';
import { ProductsResolver } from './resolvers/products.resolver';
import { UsersResolver } from './resolvers/users.resolver';

async function createLocalServer() {
  return new ApolloServer({
    schema: await buildSchema({
      resolvers: [PostsResolver, ProductsResolver, UsersResolver],
      validate: false,
    }),
  });
}

export { createLocalServer };
