import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, Int, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { User } from './User.model';

@index({ title: 'text', description: 'text' })
@index({ createdAt: -1 })
@ObjectType()
export class Product {
  @Field((_type) => ID)
  readonly _id: ObjectId;

  @Field()
  @prop({ required: true, text: true })
  public title!: string;

  @Field()
  @prop({ required: true, text: true })
  public description!: string;

  @Field()
  @prop({ requried: true })
  public location!: string;

  @Field((_type) => Int)
  @prop({ required: true })
  public price!: number;

  @Field()
  @prop({ required: true })
  public category!: string;

  @Field((_type) => [String])
  @prop({ type: () => [String] })
  public images?: string[];

  @Field((_type) => User)
  @prop({ required: true, ref: () => User })
  public creator!: Ref<User>;

  @Field((_type) => Date)
  readonly createdAt: Date;

  @Field((_type) => Date)
  readonly updatedAt: Date;
}

export const ProductModel = getModelForClass(Product, {
  schemaOptions: { timestamps: true },
});
