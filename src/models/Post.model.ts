import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { ObjectId } from 'mongodb';
import { User } from './User.model';

@ObjectType()
export class Reply {
  @Field((_type) => ID)
  readonly _id?: ObjectId;

  @Field((_type) => User)
  @prop({ required: true, ref: () => User })
  public creator!: Ref<User>;

  @Field()
  @prop({ required: true })
  public body!: string;

  @Field((_type) => Date)
  @prop({ type: () => Date, default: new Date() })
  public createdAt?: Date;
}

@index({ title: 'text', body: 'text' })
@index({ createdAt: -1 })
@ObjectType()
export class Post {
  @Field((_type) => ID)
  readonly _id?: string;

  @Field()
  @prop({ required: true })
  public title!: string;

  @Field()
  @prop({ required: true })
  public body!: string;

  @Field()
  @prop({ required: true })
  public category!: string;

  @Field((_type) => [Reply])
  @prop({ type: () => [Reply], default: [] })
  public replies?: Reply[];

  @Field((_type) => User)
  @prop({ required: true, ref: () => User })
  public creator!: Ref<User>;

  @Field((_type) => Date)
  readonly createdAt: Date;

  @Field((_type) => Date)
  readonly updatedAt: Date;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});

export { PostModel };
