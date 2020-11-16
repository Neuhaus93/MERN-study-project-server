import { gql } from 'apollo-server';

const typeDefs = gql`
  type Post {
    id: ID!
    creator: User!
    title: String!
    body: String!
    category: String!
    createdAt: String!
    replies: [Reply]!
    repliesCount: Int!
  }
  type Reply {
    id: ID!
    user: User!
    body: String!
    createdAt: String!
  }
  type Product {
    id: ID!
    creator: User!
    title: String!
    description: String!
    location: String!
    price: Int!
    category: String!
    imagesSrc: [String]!
    createdAt: String!
  }
  type User {
    id: ID!
    firebaseId: String!
    firstName: String!
    lastName: String!
    fullName: String
    email: String!
    imgSrc: String!
    likes: [ID]!
    subscription: Subscription!
    createdAt: String!
  }
  type Subscription {
    current: String!
    expirationDate: String!
    payHistory: [Payment]!
  }
  type Payment {
    date: String!
    ammount: Int!
  }
  type Query {
    getUser(firebaseId: String, mongoId: String): User!
    getUserProducts(userId: ID!): [Product]
    getUserFavorites(favoritesList: [String]!): [Product]
    getPosts: [Post]
    getPost(postId: ID!): Post
    getProduct(productId: ID!): Product
    getProducts(category: String!): [Product]
    searchProduct(term: String!): [Product]
    searchPost(term: String!): [Post]
  }
  type Mutation {
    createPost(
      userId: ID!
      title: String!
      body: String!
      category: String!
    ): Post!
    deletePost(userId: ID!, postId: ID!): Post!
    createProduct(
      userId: ID!
      title: String!
      description: String!
      location: String!
      price: Int!
      category: String!
    ): Product!
    createUser(
      firebaseId: String!
      firstName: String!
      lastName: String!
      email: String!
    ): User!
    likeProduct(userId: ID!, productId: ID!): User!
    addProductImages(id: ID!, imagesSrc: [String]!): Product!
    addUserImage(firebaseId: String!, imageSrc: String!): User!
    replyPost(postId: ID!, userId: ID!, body: String!): Post!
    deleteReply(postId: ID!, replyId: ID!): Post!
    deleteProduct(userId: ID!, productId: ID!): Product!
  }
`;

export { typeDefs };
