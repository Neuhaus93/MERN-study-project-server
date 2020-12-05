import { Document } from 'mongoose';

import { IUser } from './user';

export interface IProduct extends Document {
  creator: IUser;
  title: string;
  description: string;
  titleLowercase: string;
  descriptionLowercase: string;
  location: string;
  price: number;
  category: string;
  imagesSrc: string[];
  createdAt: string;
}
