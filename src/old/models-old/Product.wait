import { model, Schema } from 'mongoose';

import { IProduct } from '../types';

const productSchema: Schema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String!,
  description: String!,
  location: String!,
  price: Number!,
  category: String!,
  imagesSrc: [String]!,
  createdAt: String!,
});

export default model<IProduct>('Product', productSchema);
