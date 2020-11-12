import { model, Schema } from 'mongoose';

import { IUser } from '../types';

const userSchema: Schema = new Schema({
  firebaseId: String,
  firstName: String,
  lastName: String,
  email: String,
  imgSrc: String,
  likes: [String]!,
  subscription: {
    current: String,
    expirationDate: String,
    payHistory: [
      {
        date: String,
        ammount: Number,
      },
    ],
  },
  createdAt: String,
});

export default model<IUser>('User', userSchema);
