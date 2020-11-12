import { Document } from 'mongoose';

import { IUser } from './user';

export interface IProduct extends Document {
  creator: IUser;
  title: string;
  description: string;
  location: string;
  price: number;
  category: string;
  imagesSrc: string[];
  createdAt: string;
}
