const { Post } = require('../models');
const { Like } = require('../models');

class PostRepository {
  getPosts = async () => {
    try {
      const posts = await Post.findAll();

      return posts;
    } catch (error) {
      throw error
    }

  };

  findPostById = async (postId) => {
    try {
      const post = await Post.findByPk(postId);

      return post;
    } catch (error) {
      throw error
    }
  };

  createPost = async ({ userId, nickname, title, content, imgUrl }) => {
    try {
      const createPostData = await Post.create({
        userId,
        nickname,
        title,
        content,
        imgUrl,
        likeSum: 0,
      });

      return createPostData;
    } catch (error) {
      throw error
    }
  };

  updatePost = async (postId, title, content) => {
    try {
      const updatePostData = await Post.update({ title, content }, { where: { postId } });

      return updatePostData;
    } catch (error) {
      throw error
    }
  };

  deletePost = async (postId) => {
    try {
      const updatePostData = await Post.destroy({ where: { postId } });

      return updatePostData;
    } catch (error) {
      throw error
    }
  };

  createLike = async (postId, userId) => {
    try {
      const createLike = await Like.create({ user: userId, like: postId });
    } catch (error) {
      throw error
    }
  };

  countLike = async (postId) => {
    try {
      const countLike = await Post.increment({ likeSum: 1 }, { where: { postId: postId } });
      return countLike;
    } catch (error) {
      throw error
    }
  };

  deleteLike = async (postId, userId) => {
    try {
      const deleteLike = await Like.destroy({
        where: { userId: userId, like: postId },
      });
    } catch (error) {
      throw error
    }
    return deleteLike;
  };

  discountLike = async (postId) => {
    try {
      const discountLike = await Post.decrement({ likeSum: 1 }, { where: { postId: postId } });
      return discountLike;
    } catch (error) {
      throw error
    }
  };
}

module.exports = PostRepository;
