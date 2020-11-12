import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  Upload: any,
};









export type AdditionalEntityFields = {
  path?: Maybe<Scalars['String']>,
  type?: Maybe<Scalars['String']>,
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Mutation = {
   __typename?: 'Mutation',
  createPost: Post,
  deletePost: Scalars['String'],
  createProduct: Product,
  createUser: User,
};


export type MutationCreatePostArgs = {
  firebaseId: Scalars['String'],
  title: Scalars['String'],
  body: Scalars['String']
};


export type MutationDeletePostArgs = {
  userId: Scalars['String'],
  postId: Scalars['String']
};


export type MutationCreateProductArgs = {
  userId: Scalars['String'],
  title: Scalars['String'],
  description: Scalars['String'],
  location: Scalars['String'],
  price: Scalars['Int'],
  category: Scalars['String'],
  imgsSrc: Array<Maybe<Scalars['String']>>
};


export type MutationCreateUserArgs = {
  firebaseId: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String']
};

export type Payment = {
   __typename?: 'Payment',
  date: Scalars['String'],
  ammount: Scalars['Int'],
};

export type Post = {
   __typename?: 'Post',
  id: Scalars['ID'],
  title: Scalars['String'],
  firebaseId: Scalars['String'],
  body: Scalars['String'],
  createdAt: Scalars['String'],
  replies: Array<Maybe<Reply>>,
  repliesCount: Scalars['Int'],
};

export type Product = {
   __typename?: 'Product',
  id: Scalars['ID'],
  userId: Scalars['String'],
  title: Scalars['String'],
  description: Scalars['String'],
  location: Scalars['String'],
  price: Scalars['Int'],
  category: Scalars['String'],
  createdAt: Scalars['String'],
  imgsSrc: Array<Maybe<Scalars['String']>>,
};

export type Query = {
   __typename?: 'Query',
  posts?: Maybe<Array<Maybe<Post>>>,
  post?: Maybe<Post>,
  getProduct?: Maybe<Product>,
  getProducts?: Maybe<Array<Maybe<Product>>>,
  getUser?: Maybe<User>,
};


export type QueryPostArgs = {
  postId: Scalars['ID']
};


export type QueryGetProductArgs = {
  productId: Scalars['ID']
};


export type QueryGetProductsArgs = {
  category: Scalars['String']
};


export type QueryGetUserArgs = {
  firebaseId: Scalars['String']
};

export type Reply = {
   __typename?: 'Reply',
  id: Scalars['ID'],
  userId: Scalars['String'],
  body: Scalars['String'],
  createdAt: Scalars['String'],
};

export type Subscription = {
   __typename?: 'Subscription',
  current: Scalars['String'],
  expirationDate: Scalars['String'],
  payHistory: Array<Maybe<Payment>>,
};


export type User = {
   __typename?: 'User',
  id: Scalars['ID'],
  firebaseId: Scalars['String'],
  firstName: Scalars['String'],
  lastName: Scalars['String'],
  email: Scalars['String'],
  imgSrc: Scalars['String'],
  subscription: Subscription,
  ads?: Maybe<Array<Maybe<Product>>>,
  createdAt: Scalars['String'],
};



export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  Post: ResolverTypeWrapper<Post>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Reply: ResolverTypeWrapper<Reply>,
  Int: ResolverTypeWrapper<Scalars['Int']>,
  Product: ResolverTypeWrapper<Product>,
  User: ResolverTypeWrapper<User>,
  Subscription: ResolverTypeWrapper<{}>,
  Payment: ResolverTypeWrapper<Payment>,
  Mutation: ResolverTypeWrapper<{}>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  CacheControlScope: CacheControlScope,
  Upload: ResolverTypeWrapper<Scalars['Upload']>,
  AdditionalEntityFields: AdditionalEntityFields,
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {},
  Post: Post,
  ID: Scalars['ID'],
  String: Scalars['String'],
  Reply: Reply,
  Int: Scalars['Int'],
  Product: Product,
  User: User,
  Subscription: {},
  Payment: Payment,
  Mutation: {},
  Boolean: Scalars['Boolean'],
  CacheControlScope: CacheControlScope,
  Upload: Scalars['Upload'],
  AdditionalEntityFields: AdditionalEntityFields,
};

export type UnionDirectiveArgs = {   discriminatorField?: Maybe<Scalars['String']>,
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type UnionDirectiveResolver<Result, Parent, ContextType = any, Args = UnionDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AbstractEntityDirectiveArgs = {   discriminatorField: Scalars['String'],
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type AbstractEntityDirectiveResolver<Result, Parent, ContextType = any, Args = AbstractEntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EntityDirectiveArgs = {   embedded?: Maybe<Scalars['Boolean']>,
  additionalFields?: Maybe<Array<Maybe<AdditionalEntityFields>>> };

export type EntityDirectiveResolver<Result, Parent, ContextType = any, Args = EntityDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ColumnDirectiveArgs = {   overrideType?: Maybe<Scalars['String']> };

export type ColumnDirectiveResolver<Result, Parent, ContextType = any, Args = ColumnDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type IdDirectiveArgs = {  };

export type IdDirectiveResolver<Result, Parent, ContextType = any, Args = IdDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type LinkDirectiveArgs = {   overrideType?: Maybe<Scalars['String']> };

export type LinkDirectiveResolver<Result, Parent, ContextType = any, Args = LinkDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type EmbeddedDirectiveArgs = {  };

export type EmbeddedDirectiveResolver<Result, Parent, ContextType = any, Args = EmbeddedDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MapDirectiveArgs = {   path: Scalars['String'] };

export type MapDirectiveResolver<Result, Parent, ContextType = any, Args = MapDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPost?: Resolver<ResolversTypes['Post'], ParentType, ContextType, RequireFields<MutationCreatePostArgs, 'firebaseId' | 'title' | 'body'>>,
  deletePost?: Resolver<ResolversTypes['String'], ParentType, ContextType, RequireFields<MutationDeletePostArgs, 'userId' | 'postId'>>,
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'userId' | 'title' | 'description' | 'location' | 'price' | 'category' | 'imgsSrc'>>,
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'firebaseId' | 'firstName' | 'lastName' | 'email'>>,
};

export type PaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['Payment'] = ResolversParentTypes['Payment']> = {
  date?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  ammount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type PostResolvers<ContextType = any, ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firebaseId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  replies?: Resolver<Array<Maybe<ResolversTypes['Reply']>>, ParentType, ContextType>,
  repliesCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type ProductResolvers<ContextType = any, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  description?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  location?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>,
  category?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imgsSrc?: Resolver<Array<Maybe<ResolversTypes['String']>>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  posts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Post']>>>, ParentType, ContextType>,
  post?: Resolver<Maybe<ResolversTypes['Post']>, ParentType, ContextType, RequireFields<QueryPostArgs, 'postId'>>,
  getProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductArgs, 'productId'>>,
  getProducts?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType, RequireFields<QueryGetProductsArgs, 'category'>>,
  getUser?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<QueryGetUserArgs, 'firebaseId'>>,
};

export type ReplyResolvers<ContextType = any, ParentType extends ResolversParentTypes['Reply'] = ResolversParentTypes['Reply']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  body?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type SubscriptionResolvers<ContextType = any, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  current?: SubscriptionResolver<ResolversTypes['String'], "current", ParentType, ContextType>,
  expirationDate?: SubscriptionResolver<ResolversTypes['String'], "expirationDate", ParentType, ContextType>,
  payHistory?: SubscriptionResolver<Array<Maybe<ResolversTypes['Payment']>>, "payHistory", ParentType, ContextType>,
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload'
}

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  firebaseId?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  imgSrc?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  subscription?: Resolver<ResolversTypes['Subscription'], ParentType, ContextType>,
  ads?: Resolver<Maybe<Array<Maybe<ResolversTypes['Product']>>>, ParentType, ContextType>,
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export type Resolvers<ContextType = any> = {
  Mutation?: MutationResolvers<ContextType>,
  Payment?: PaymentResolvers<ContextType>,
  Post?: PostResolvers<ContextType>,
  Product?: ProductResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  Reply?: ReplyResolvers<ContextType>,
  Subscription?: SubscriptionResolvers<ContextType>,
  Upload?: GraphQLScalarType,
  User?: UserResolvers<ContextType>,
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  union?: UnionDirectiveResolver<any, any, ContextType>,
  abstractEntity?: AbstractEntityDirectiveResolver<any, any, ContextType>,
  entity?: EntityDirectiveResolver<any, any, ContextType>,
  column?: ColumnDirectiveResolver<any, any, ContextType>,
  id?: IdDirectiveResolver<any, any, ContextType>,
  link?: LinkDirectiveResolver<any, any, ContextType>,
  embedded?: EmbeddedDirectiveResolver<any, any, ContextType>,
  map?: MapDirectiveResolver<any, any, ContextType>,
};


/**
* @deprecated
* Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
*/
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;
import { ObjectID } from 'mongodb';