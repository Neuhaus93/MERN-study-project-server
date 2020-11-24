import { gql } from 'apollo-server';

const typeDefs = gql`
  type User {
    id: ID!
    firebaseId: String!
    firstName: String!
    lastName: String!
    fullName: String
    email: String!
    socials: Socials
    imgSrc: String!
    likes: [ID]!
    subscription: Subscription!
    createdAt: String!
  }
  type Socials {
    phoneNumber: String
    facebook: String
    linkedin: String
    instagram: String
  }
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
  type Subscription {
    current: String!
    expirationDate: String!
    payHistory: [Payment]!
  }
  type Payment {
    date: String!
    ammount: Int!
  }
  ## --- INPUTS --- ##
  input EditUserInput {
    firstName: String!
    lastName: String!
    phoneNumber: String
    facebook: String
    linkedin: String
    instagram: String
  }
  input UpdateProductInput {
    userId: ID!
    productId: ID!
    title: String
    description: String
    location: String
    category: String
    price: Int
    imagesSrc: [String]
  }
  ## --- QUERIES --- ##
  type Query {
    getUser(firebaseId: String, mongoId: String): User!
    getUserProducts(userId: ID!): [Product]
    getUserFavorites(favoritesList: [String]!): [Product]
    getPosts: [Post]
    getPost(postId: ID!): Post
    getProduct(productId: ID!): Product
    getHomepageProducts: [Product]
    getProducts(category: String!): [Product]
    searchProducts(term: String!): [Product]
    searchPosts(term: String!): [Post]
  }
  ## --- MUTATIONS --- ##
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
    updateUser(userId: ID!, input: EditUserInput): User!
    updateProduct(updateProductInput: UpdateProductInput!): Product!
    likeProduct(userId: ID!, productId: ID!): User!
    addProductImages(id: ID!, imagesSrc: [String]!): Product!
    addUserImage(firebaseId: String!, imageSrc: String!): User!
    replyPost(postId: ID!, userId: ID!, body: String!): Post!
    deleteReply(postId: ID!, replyId: ID!): Post!
    deleteProduct(userId: ID!, productId: ID!): Product!
  }
`;

export { typeDefs };
