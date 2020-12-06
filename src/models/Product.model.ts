import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User.model';

@index({ title: 'text', description: 'text' })
@index({ createdAt: -1 })
@ObjectType()
export class Product {
  @Field(() => ID)
  _id: string;

  @Field()
  @prop({ required: true, text: true })
  public title!: string;

  @Field()
  @prop({ required: true, text: true })
  public description!: string;

  @Field()
  @prop({ requried: true })
  public location!: string;

  @Field()
  @prop({ required: true })
  public price!: number;

  @Field()
  @prop({ required: true })
  public category!: string;

  @Field(() => [String])
  @prop({ type: () => [String] })
  public images?: string[];

  @Field(() => User)
  @prop({ required: true, ref: () => User })
  public creator!: Ref<User>;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
});
