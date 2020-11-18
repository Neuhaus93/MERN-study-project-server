import { UserInputError, AuthenticationError } from 'apollo-server';

import { IProduct } from '../types';
import { ProductModel, UserModel } from '../models';

const productsResolvers = {
  Query: {
    async getProduct(_, { productId }): Promise<IProduct> {
      try {
        const product = await ProductModel.findById(productId).populate(
          'creator'
        );

        if (product) {
          return product;
        } else {
          throw new Error('Product not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getProducts(_, { category }): Promise<IProduct[]> {
      try {
        const products = await ProductModel.find().sort({ createdAt: -1 });
        return category
          ? products.filter((product) => product.category === category)
          : products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserProducts(_, { userId }): Promise<IProduct[]> {
      if (userId.trim() === '') {
        throw new UserInputError('User must have a firebaseId');
      }

      try {
        const products = await ProductModel.find({ creator: userId }).sort({
          createdAt: -1,
        });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async getUserFavorites(_, { favoritesList }): Promise<IProduct[]> {
      if (!favoritesList) {
        throw new UserInputError('A list needs to be provided');
      }
      if (favoritesList.length === 0) {
        return [];
      }

      try {
        const products = await ProductModel.find({
          _id: { $in: favoritesList },
        }).sort({ createdAt: -1 });
        return products;
      } catch (err) {
        throw new Error(err);
      }
    },
    async searchProducts(_, { term }): Promise<IProduct[]> {
      if (!term || term.trim() === '') {
        throw new UserInputError('Must have a search term');
      }

      const where = { $text: { $search: term } };

      try {
        const foundProducts = await ProductModel.find(where).sort({
          createdAt: -1,
        });

        return foundProducts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createProduct(_, args): Promise<IProduct> {
      const { userId, title, description, location, price, category } = args;
      const categories = ['equipment', 'tools', 'software'];

      if (!categories.includes(category)) {
        throw new UserInputError('Category does not exist');
      }

      if (title.trim() === '') {
        throw new UserInputError('Product title must not be empty');
      }

      try {
        const user = await UserModel.findById(userId);

        const newProduct = new ProductModel({
          creator: user,
          title,
          description,
          location,
          price,
          category,
          imagesSrc: [],
          createdAt: new Date().toISOString(),
        });

        return (await newProduct.save()).populate('creator');
      } catch (err) {
        console.log(err);
      }
    },
    async addProductImages(_, { id, imagesSrc }) {
      if (!imagesSrc || imagesSrc.length === 0) {
        throw new UserInputError('Must have new images to update');
      }
      if (id.trim() === '') {
        throw new UserInputError('Must have the post id');
      }

      try {
        const oldProduct = await ProductModel.findById(id);

        if (!oldProduct) {
          return new UserInputError('Product does not exist');
        }

        oldProduct.imagesSrc = [...oldProduct.imagesSrc, ...imagesSrc];

        const updatedProduct = oldProduct.save();
        return updatedProduct;
      } catch (err) {
        console.log(err);
      }
    },
    async deleteProduct(_, { userId, productId }): Promise<IProduct> {
      if (!userId || !productId) {
        throw new UserInputError('Cannot have undefined IDs');
      }

      if (userId.trim() === '' || productId.trim() === '') {
        throw new UserInputError('IDs cannot be empty');
      }

      try {
        const product = await ProductModel.findById(productId);
        if (userId === product.creator.toString()) {
          return await product.deleteOne();
        } else {
          throw new AuthenticationError('User cannot perform this action');
        }
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export { productsResolvers };
