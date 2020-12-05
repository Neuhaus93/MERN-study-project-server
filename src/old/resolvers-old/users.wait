const { UserInputError } = require('apollo-server');

import { IUser } from '../types';
import { UserModel } from '../models';
import { AuthenticationError } from 'apollo-server';

const usersResolvers = {
  Query: {
    async getUser(_, { mongoId, firebaseId }): Promise<IUser> {
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
    },
  },
  Mutation: {
    async createUser(
      _,
      { firebaseId, firstName, lastName, email }
    ): Promise<IUser> {
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
        favoriteAds: [],
        imgSrc: '',
        subscription: {
          current: 'free',
          expirationDate: '',
          payHistory: [],
        },
        createdAt: new Date().toISOString(),
      });

      const user = await newUser.save();
      return user;
    },
    async updateUser(_, { userId, input }): Promise<IUser> {
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
      } = input;
      if (!firstName && !lastName) {
        throw new Error('All inputs are empty');
      }

      try {
        const user = await UserModel.findById(userId);
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

        return await user.save();
      } catch (err) {
        console.log(err);
      }
    },
    async likeProduct(_, { userId, productId }): Promise<IUser> {
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
      if (user.likes.find((likeId) => likeId === productId)) {
        user.likes = user.likes.filter((like) => productId !== like);
      } else {
        user.likes.push(productId);
      }

      // Return the updated user
      return user.save();
    },
    async addUserImage(_, { firebaseId, imageSrc }): Promise<IUser> {
      if (!firebaseId || !imageSrc) {
        throw new UserInputError('Must have firebaseId and image src');
      }

      if (firebaseId.trim() === '' || imageSrc.trim() === '') {
        throw new UserInputError('firebaseId and imageSrc must not be empty');
      }

      try {
        const user = await UserModel.findOne({ firebaseId });
        user.imgSrc = imageSrc;
        await user.save();

        return user;
      } catch (err) {
        console.log(err);
      }
    },
  },
};

export { usersResolvers };
