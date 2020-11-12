import { AuthenticationError, UserInputError } from 'apollo-server';

import { IPost } from '../types';
import { PostModel, UserModel } from '../models';

const postsResolvers = {
  Query: {
    getPost: async (_, { postId }): Promise<IPost> => {
      if (postId.trim() === '') {
        throw new UserInputError('Post ID must not be empty');
      }

      try {
        const post = await PostModel.findById(postId)
          .populate({
            path: 'replies',
            populate: { path: 'user' },
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
    },
    getPosts: async (): Promise<IPost[]> => {
      try {
        const posts = await PostModel.find()
          .populate('creator')
          .sort({ createdAt: -1 });
        return posts;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
  Mutation: {
    async createPost(_, { userId, title, body, category }): Promise<IPost> {
      if (!body || body.trim() === '') {
        throw new Error('Post body must not be empty');
      }
      if (!userId || userId.trim() === '') {
        throw new Error('Post need to contain a user');
      }

      const newPost = new PostModel({
        creator: userId,
        title,
        body,
        category,
        createdAt: new Date().toISOString(),
      });

      const post = await newPost.save();

      return post;
    },
    async deletePost(_, { userId, postId }): Promise<string> {
      if (userId.trim() === '' || postId.trim() === '') {
        throw new AuthenticationError('Action not allowed');
      }

      try {
        const post = await PostModel.findById(postId);
        if (userId === post.creator._id) {
          await post.deleteOne();
          return 'Post deleted successfully';
        } else {
          throw new AuthenticationError('Action not allowed');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async replyPost(_, { postId, userId, body }) {
      if (postId.trim() === '' || userId.trim() === '' || body.trim() === '') {
        throw new UserInputError('Must have userId and body');
      }

      try {
        const post = await PostModel.findById(postId);
        if (!post) throw new UserInputError('Post does not exist');

        const user = await UserModel.findById(userId);
        if (!user) throw new UserInputError('User does not exist');

        post.replies.push({
          user,
          body,
          createdAt: new Date().toISOString(),
        });

        await post.save();

        return await PostModel.findById(postId)
          .populate({
            path: 'replies',
            populate: { path: 'user' },
          })
          .populate('creator');
      } catch (err) {
        throw new Error(err);
      }
    },
    async deleteReply(_, { postId, replyId }): Promise<IPost> {
      if (postId.trim() === '' || replyId.trim() === '') {
        throw new UserInputError('Must have the Ids');
      }

      try {
        const post = await PostModel.findById(postId);
        if (!post) throw new UserInputError('Post does not exist');

        const newReplies = post.replies.filter((reply) => reply.id !== replyId);
        post.replies = newReplies;

        await post.save();
        return post;
      } catch (err) {
        throw new Error(err);
      }
    },
  },
};

export { postsResolvers };
