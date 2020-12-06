import { getModelForClass, prop } from '@typegoose/typegoose';
import { ObjectId } from 'mongodb';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class UserSocials {
  @Field({ nullable: true })
  @prop()
  public phoneNumber?: string;

  @Field({ nullable: true })
  @prop()
  public facebook?: string;

  @Field({ nullable: true })
  @prop()
  public linkedin?: string;

  @Field({ nullable: true })
  @prop()
  public instagram?: string;
}

// interface UserSocialss {
//   phoneNumber: string;
//   facebook: string;
//   linkedin: string;

//   instagram: string;
// }

@ObjectType()
export class User {
  @Field((_type) => ID)
  readonly _id: ObjectId;

  @prop({ required: true })
  public firebaseId!: string;

  @Field()
  @prop({ required: true })
  public firstName!: string;

  @Field()
  @prop({ required: true })
  public lastName!: string;

  @Field()
  @prop({ required: true })
  public email!: string;

  @Field({ nullable: true })
  @prop()
  public photo?: string;

  @Field((_type) => UserSocials)
  @prop({ required: true, type: () => UserSocials, _id: false })
  public socials!: UserSocials;

  @Field((_type) => [String], { defaultValue: [] })
  @prop({ type: () => [String] })
  public likes?: string[];

  @Field((_type) => Date)
  createdAt?: Date;

  @Field((_type) => Date)
  updatedAt?: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
