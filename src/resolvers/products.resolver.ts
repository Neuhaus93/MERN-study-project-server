import { AuthenticationError, UserInputError } from 'apollo-server';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from 'type-graphql';
import { Product, ProductModel } from '../models/Product.model';
import { User, UserModel } from '../models/User.model';
import { ContextType } from '../types';

@InputType()
class CreateProductInput {
  @Field()
  title: string;

  @Field()
  description: string;

  @Field()
  location: string;

  @Field()
  price: string;

  @Field()
  category: string;
}

@InputType()
class UpdateProductInput extends CreateProductInput {
  @Field()
  productId: string;

  @Field(() => [String])
  images: string[];
}

@Resolver((_of) => ProductModel)
export class ProductsResolver {
  @Query(() => Product)
  async product(@Arg('productId') productId: string) {
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
  }

  @Query(() => [Product])
  async products(
    @Arg('category', { defaultValue: undefined, nullable: true })
    category: string,
    @Arg('first', { defaultValue: 25, nullable: true }) first: number
  ): Promise<Product[]> {
    const limit = Math.min(first, 50) || 50;
    const where = category ? { category } : {};

    try {
      return await ProductModel.find()
        .where(where)
        .sort({ createdAt: -1 })
        .limit(limit);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Query(() => [Product])
  async userProducts(@Arg('userId') userId: string): Promise<Product[]> {
    if (userId.trim() === '') {
      throw new UserInputError('User must have a firebaseId');
    }
    try {
      return await ProductModel.find({ creator: userId }).sort({
        createdAt: -1,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Query(() => [Product])
  async userFavorites(
    @Arg('favoritesList', () => [String]) favoritesList: string[]
  ): Promise<Product[]> {
    if (!favoritesList) {
      throw new UserInputError('A list needs to be provided');
    }
    if (favoritesList.length === 0) {
      return [];
    }

    try {
      return await ProductModel.find({
        _id: { $in: favoritesList },
      }).sort({ createdAt: -1 });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Query(() => [Product])
  async searchProducts(@Arg('term') term: string): Promise<Product[]> {
    if (!term || term.trim() === '') {
      throw new UserInputError('Must have a search term');
    }

    const where = { $text: { $search: term } };
    try {
      return await ProductModel.find(where).sort({
        createdAt: -1,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Mutation(() => Product)
  async createProduct(
    @Arg('createProductInput') createProductInput: CreateProductInput,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Product> {
    const {
      title,
      description,
      location,
      price,
      category,
    } = createProductInput;

    if (title.trim() === '' || description.trim() === '') {
      throw new UserInputError(
        'Product title and description must not be empty'
      );
    }

    try {
      const user = await UserModel.findOne({ firebaseId });
      if (!user) {
        throw new UserInputError('User does not exist');
      }

      const newProduct = await ProductModel.create({
        creator: user,
        title,
        description,
        location,
        price: parseInt(price),
        category: category.toLowerCase(),
        images: [],
      });

      (await newProduct.save()).populate('creator');
      return newProduct;
    } catch (err) {
      console.log(err);
      throw new Error('Unexpected Error');
    }
  }

  @Authorized()
  @Mutation(() => Product)
  async addProductImages(
    @Arg('productId') productId: string,
    @Arg('imagesSrc', () => [String]) imagesSrc: string[]
  ): Promise<Product> {
    if (!imagesSrc || imagesSrc.length === 0) {
      throw new UserInputError('Must have new images to update');
    }
    if (productId.trim() === '') {
      throw new UserInputError('Must have the post id');
    }

    try {
      const product = await ProductModel.findById(productId);

      if (!product) {
        throw new UserInputError('Product does not exist');
      }

      if (!product.images) {
        product.images = [...imagesSrc];
      } else {
        product.images = [...product.images, ...imagesSrc];
      }

      await product.save();
      return product;
    } catch (err) {
      console.log(err);
      throw new Error('Unexpected error');
    }
  }

  @Authorized()
  @Mutation(() => Product)
  async udpateProduct(
    @Arg('updateProductInput') updateProductInput: UpdateProductInput,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Product> {
    const {
      productId,
      title,
      description,
      location,
      price,
      category,
      images,
    } = updateProductInput;

    if (!productId || !productId.trim()) {
      throw new UserInputError('Cannot have undefined IDs');
    }

    try {
      const product = await ProductModel.findById(productId).populate(
        'creator'
      );
      if (!product || !product.creator) {
        throw new UserInputError('Product does not exist');
      }

      if ((product.creator as User).firebaseId.toString() !== firebaseId) {
        throw new AuthenticationError('User cannot perform this action');
      }

      title && (product.title = title);
      description && (product.description = description);
      location && (product.location = location);
      price && (product.price = parseInt(price));
      category && (product.category = category);
      images && (product.images = images);

      await product.save();
      return product;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Mutation((_returns) => Boolean)
  async deleteProduct(
    @Arg('productId') productId: string,
    @Ctx() { firebaseId }: ContextType
  ): Promise<boolean> {
    if (!productId) {
      throw new UserInputError('Cannot have undefined IDs');
    }

    if (productId.trim() === '') {
      throw new UserInputError('IDs cannot be empty');
    }

    try {
      const product = await ProductModel.findById(productId).populate(
        'creator'
      );
      if (!product) {
        throw new UserInputError('Product does not exist');
      }
      if (!product.creator) {
        throw new Error('Creator of product not found');
      }
      if ((product.creator as User).firebaseId === firebaseId) {
        await product.deleteOne();
        return true;
      } else {
        throw new AuthenticationError('User cannot perform this action');
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}
