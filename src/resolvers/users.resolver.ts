import { AuthenticationError, UserInputError } from 'apollo-server';
import {
  Arg,
  Field,
  FieldResolver,
  InputType,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { User, UserModel } from '../models/User.model';

@InputType()
class CreateUserInput {
  @Field()
  firebaseId: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;
}

@InputType()
class UpdateUserInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field({ defaultValue: '' })
  phoneNumber: string;

  @Field({ defaultValue: '' })
  facebook: string;

  @Field({ defaultValue: '' })
  linkedin: string;

  @Field({ defaultValue: '' })
  instagram: string;
}

@Resolver((_of) => User)
export class UsersResolver {
  @FieldResolver(() => String)
  fullName(@Root() { _doc: user }: { _doc: User }): string {
    return `${user.firstName} ${user.lastName}`;
  }

  @Query((_returns) => User)
  async user(
    @Arg('mongoId', { nullable: true }) mongoId: string,
    @Arg('firebaseId', { nullable: true }) firebaseId: string
  ): Promise<User | null> {
    if (!firebaseId && !mongoId) {
      throw new UserInputError('User ID must be specified');
    }

    if (firebaseId && firebaseId.trim() === '') {
      throw new UserInputError('Firebase ID must not be empty');
    }

    if (mongoId && mongoId.trim() === '') {
      throw new UserInputError('Mongo ID must not be empty');
    }

    if (mongoId) {
      try {
        return await UserModel.findById(mongoId);
      } catch (err) {
        throw new Error(err);
      }
    } else {
      try {
        return await UserModel.findOne({ firebaseId });
      } catch (err) {
        throw new Error(err);
      }
    }
  }

  @Mutation((_returns) => User)
  async createUser(@Arg('createUserInput') createUserInput: CreateUserInput) {
    const { firebaseId, firstName, lastName, email } = createUserInput;
    if (
      firstName.trim() === '' ||
      lastName.trim() === '' ||
      email.trim() === ''
    ) {
      throw new UserInputError('Fields must be filled correctly');
    }

    const newUser = new UserModel({
      firebaseId,
      firstName,
      lastName,
      email,
      socials: {
        phoneNumber: '',
        facebook: '',
        linkedin: '',
        instagram: '',
      },
      likes: [],
      photo: '',
      // subscription: {
      //   current: 'free',
      //   expirationDate: '',
      //   payHistory: [],
      // }
    });
    try {
      return await newUser.save();
    } catch {
      throw new Error('Failed to create a new user');
    }
  }

  @Mutation((_returns) => User)
  async updateUser(
    @Arg('userId') userId: string,
    @Arg('updateUserInput') updateUserInput: UpdateUserInput
  ): Promise<User | undefined> {
    if (!userId || userId.trim() === '') {
      throw new UserInputError('Must have the user ID');
    }

    const {
      firstName,
      lastName,
      phoneNumber,
      facebook,
      linkedin,
      instagram,
    } = updateUserInput;

    try {
      const user = await UserModel.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      if (firstName) {
        user.firstName = firstName;
      }
      if (lastName) {
        user.lastName = lastName;
      }

      user.socials.phoneNumber = phoneNumber;
      user.socials.facebook = facebook;
      user.socials.linkedin = linkedin;
      user.socials.instagram = instagram;

      await user.save();
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Mutation(() => User)
  async likeProduct(
    @Arg('userId') userId: string,
    @Arg('productId') productId: string
  ): Promise<User> {
    // If arguments are not passed correctly, throw an error
    if (productId.trim() === '' || userId.trim() === '') {
      throw new UserInputError('Must have the ad ID');
    }

    // Get the user from the database
    const user = await UserModel.findById(userId);

    // User does not exist
    if (!user) {
      throw new AuthenticationError('User does not exist');
    }

    // If liked, unlike it. If not liked, like it
    if (user.likes?.find((likeId) => likeId === productId)) {
      user.likes = user.likes.filter((like) => productId !== like);
    } else if (!user.likes) {
      user.likes = [productId];
    } else {
      user.likes.push(productId);
    }

    // Return the updated user
    await user.save();
    return user;
  }

  @Mutation(() => User)
  async addUserImage(
    @Arg('firebaseId') firebaseId: string,
    @Arg('imageSrc') imageSrc: string
  ): Promise<User> {
    if (!firebaseId || !imageSrc) {
      throw new UserInputError('Must have firebaseId and image src');
    }

    if (firebaseId.trim() === '' || imageSrc.trim() === '') {
      throw new UserInputError('firebaseId and imageSrc must not be empty');
    }

    try {
      const user = await UserModel.findOne({ firebaseId });
      if (!user) {
        throw new Error('User not found');
      }
      user.photo = imageSrc;
      await user.save();
      return user;
    } catch (err) {
      console.log(err);
      throw new Error('Unexpected error');
    }
  }
}
