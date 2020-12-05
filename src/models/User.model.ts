import { getModelForClass, pre, prop } from '@typegoose/typegoose';
import { Field, ID, ObjectType } from 'type-graphql';

@ObjectType()
class UserSocials {
  @Field({ nullable: true })
  phoneNumber: string;

  @Field({ nullable: true })
  facebook: string;

  @Field({ nullable: true })
  linkedin: string;

  @Field({ nullable: true })
  instagram: string;
}

@ObjectType()
@pre<User>('save', function () {
  this.updatedAt = new Date();
})
export class User {
  @Field(() => ID)
  public _id: string;

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

  @Field(() => UserSocials)
  @prop({ required: true, type: () => UserSocials })
  public socials!: UserSocials;

  @Field(() => [String], { defaultValue: [] })
  @prop({ type: () => [String] })
  public likes?: string[];

  @Field(() => Date)
  public createdAt?: Date;

  @Field(() => Date)
  public updatedAt!: Date;
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
});
