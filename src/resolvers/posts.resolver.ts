import { DocumentType } from '@typegoose/typegoose';
import { AuthenticationError, UserInputError } from 'apollo-server';
import {
  Arg,
  Authorized,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
} from 'type-graphql';
import { Post, PostModel } from '../models/Post.model';
import { User, UserModel } from '../models/User.model';
import { ContextType } from '../types';

@InputType()
class PostInput implements Partial<Post> {
  @Field()
  title: string;

  @Field()
  body: string;

  @Field()
  category: string;
}

@Resolver((_of) => Post)
export class PostsResolver {
  @FieldResolver(() => Int)
  repliesCount(@Root() { _doc: post }: { _doc: Post }): number {
    return post.replies?.length || 0;
  }

  @Query((_returns) => Post)
  async post(@Arg('postId') postId: string): Promise<Post> {
    try {
      const post = await PostModel.findById(postId)
        .populate({
          path: 'replies',
          populate: { path: 'creator' },
        })
        .populate('creator');
      if (post) {
        return post;
      } else {
        throw new Error('Post not found');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  @Query((_returns) => [Post])
  async posts(): Promise<Post[]> {
    try {
      const posts = await PostModel.find()
        .populate('creator')
        .sort({ createdAt: -1 });
      return posts;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Query((_returns) => [Post])
  async searchPosts(@Arg('term') term: string): Promise<Post[]> {
    if (!term || term.trim() === '') {
      throw new UserInputError('Must have a search term');
    }

    const where = { $text: { $search: term } };

    try {
      const foundProducts = await PostModel.find(where)
        .sort({
          createdAt: -1,
        })
        .populate('creator');

      return foundProducts;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Mutation((_returns) => Post)
  async createPost(
    @Arg('postInput') postInput: PostInput,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Post> {
    const { title, body, category } = postInput;

    if (!body || body.trim() === '') {
      throw new Error('Post body must not be empty');
    }

    const user = await UserModel.findOne({ firebaseId });
    if (!user) {
      throw new AuthenticationError('Authentication error');
    }

    const newPost = await PostModel.create<DocumentType<Post>>({
      title,
      body,
      category: category.toLowerCase(),
      creator: user._id,
    });

    await newPost.save();
    return newPost;
  }

  @Authorized()
  @Mutation((_returns) => Post)
  async deletePost(
    @Arg('postId') postId: string,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Post> {
    if (postId.trim() === '') {
      throw new AuthenticationError('User and post ID cannot be empty');
    }

    try {
      const post = await PostModel.findById(postId).populate('creator');
      if (!post) {
        throw new Error('Post not found');
      }

      if ((post.creator as User).firebaseId === firebaseId) {
        return await post.deleteOne();
      } else {
        throw new AuthenticationError('User cannot perform this action');
      }
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Mutation((_returns) => Post)
  async replyPost(
    @Arg('postId') postId: string,
    @Arg('body') body: string,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Post> {
    if (postId.trim() === '' || body.trim() === '') {
      throw new UserInputError('Must have userId and body');
    }

    try {
      const post = await PostModel.findById(postId);
      if (!post) throw new UserInputError('Post does not exist');

      const creator = await UserModel.findOne({ firebaseId });
      if (!creator) throw new UserInputError('User does not exist');

      if (!post.replies) {
        post.replies = [{ creator, body }];
      } else {
        post.replies.push({ creator, body });
      }
      await post.save();
      return post;
    } catch (err) {
      throw new Error(err);
    }
  }

  @Authorized()
  @Mutation((_returns) => Post)
  async deleteReply(
    @Arg('postId') postId: string,
    @Arg('replyId') replyId: string,
    @Ctx() { firebaseId }: ContextType
  ): Promise<Post> {
    if (postId.trim() === '' || replyId.trim() === '') {
      throw new UserInputError('Must have the Ids');
    }

    try {
      const post = await PostModel.findById(postId).populate({
        path: 'replies',
        populate: { path: 'creator' },
      });
      if (!post || !post.replies) {
        throw new UserInputError('Post does not exist');
      }

      // console.log({ replyIdType: typeof replyId, replies: post.replies });

      const newReplies = post.replies.filter((reply) => {
        if (
          reply._id?.toString() === replyId &&
          (reply.creator as User).firebaseId === firebaseId
        ) {
          return false;
        }
        return true;
      });

      if (post.replies.length === newReplies.length) {
        throw new Error('Reply not found');
      }

      post.replies = newReplies;

      await post.save();
      return post;
    } catch (err) {
      throw new Error(err);
    }
  }
}
