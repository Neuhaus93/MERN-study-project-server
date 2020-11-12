import { postsResolvers } from './posts';
import { productsResolvers } from './products';
import { usersResolvers } from './users';

const resolvers = {
  Post: {
    repliesCount: (parent) => parent.replies.length,
  },
  User: {
    fullName: (parent) => `${parent.firstName} ${parent.lastName}`,
  },
  Query: {
    ...postsResolvers.Query,
    ...productsResolvers.Query,
    ...usersResolvers.Query,
  },
  Mutation: {
    ...postsResolvers.Mutation,
    ...productsResolvers.Mutation,
    ...usersResolvers.Mutation,
  },
};

export { resolvers };
