import { Document } from 'mongoose';

import { IUser } from './user';

export interface IPost extends Document {
  creator: IUser;
  title: string;
  body: string;
  category: string;
  replies: IReply[];
  createdAt: string;
}

interface IReply {
  id?: string;
  user: IUser;
  body: string;
  createdAt: string;
}
