import { model, Schema } from 'mongoose';

import { IPost } from '../types';

const postSchema: Schema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  body: String,
  category: String,
  replies: [
    {
      user: { type: Schema.Types.ObjectId, ref: 'User' },
      body: String,
      createdAt: String,
    },
  ],
  createdAt: String,
});

export default model<IPost>('Post', postSchema);
