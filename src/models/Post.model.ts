import { getModelForClass, index, prop, Ref } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';
import { User } from './User.model';

@ObjectType()
export class Reply {
  @Field((_type) => ID)
  _id?: string;

  @Field((_type) => User)
  @prop({ required: true, ref: () => User })
  public user!: Ref<User>;

  @Field()
  @prop({ required: true })
  public body!: string;

  @Field((_type) => Date)
  @prop({ required: true, type: () => Date, default: new Date() })
  public createdAt!: Date;
}

@index({ title: 'text', body: 'text' })
@index({ createdAt: -1 })
@ObjectType()
export class Post {
  @Field((_type) => ID)
  _id?: string;

  @Field()
  @prop({ required: true })
  public title!: string;

  @Field()
  @prop({ required: true })
  public body!: string;

  @Field()
  @prop({ required: true })
  public category!: string;

  @Field(() => [Reply])
  @prop({ type: () => [Reply], default: [] })
  public replies?: Reply[];

  @Field(() => User)
  @prop({ required: true, ref: () => User })
  public creator!: Ref<User>;

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;
}

const PostModel = getModelForClass(Post, {
  schemaOptions: { timestamps: true },
});

export { PostModel };
