import { Document } from 'mongoose';

export interface IUser extends Document {
  firebaseId: string;
  firstName: string;
  lastName: string;
  email: string;
  imgSrc: string;
  likes: string[];
  subscription: [ISubscription];
  createdAt: string;
}

export interface ISubscription {
  current: string;
  expirationDate: string;
  payHistory: [IPayment];
}

export interface IPayment {
  date: string;
  ammount: number;
}
