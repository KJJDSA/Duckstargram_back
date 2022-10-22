const { Post } = require('../models');
const { Like } = require('../models');

class PostRepository {
  getPosts = async () => {
    const posts = await Post.findAll();

    return posts;
  };

  findPostById = async (postId) => {
    const post = await Post.findByPk(postId);

    return post;
  };

  createPost = async ({ userId, nickname, title, content, imgUrl }) => {
    const createPostData = await Post.create({
      userId,
      nickname,
      title,
      content,
      imgUrl,
      likeSum: 0,
    });

    return createPostData;
  };

  updatePost = async (postId, title, content) => {
    const updatePostData = await Post.update({ title, content }, { where: { postId } });

    return updatePostData;
  };

  deletePost = async (postId) => {
    const updatePostData = await Post.destroy({ where: { postId } });

    return updatePostData;
  };

  createLike = async (postId, userId) => {
    const createLike = await Like.create({ user: userId, like: postId });
  };

  countLike = async (postId) => {
    const countLike = await Post.increment({ likeSum: 1 }, { where: { postId: postId } });
    return countLike;
  };

  deleteLike = async (postId, userId) => {
    const deleteLike = await Like.destroy({
      where: { userId: userId, like: postId },
    });
    return deleteLike;
  };

  discountLike = async (postId) => {
    const discountLike = await Post.decrement({ likeSum: 1 }, { where: { postId: postId } });
    return discountLike;
  };
}

module.exports = PostRepository;
