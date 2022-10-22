const { Comment } = require('../models');

class Commentsrepository {

  getComments = async ({ postId }) => {
    try {
      const comments = await Comment.findAll({
        where: { postId },
      });
      return comments;
    } catch (error) {
      throw error
    }
  }

  postComment = async ({ postId, userId, nickname, comment }) => {
    try {
      // console.log(postId, userId, nickname, comment)
      let data = await Comment.create({ postId, userId, nickname, comment });
      return data;
    } catch (error) {
      throw error
    }
  }

  putComment = async ({ commentId, userId, comment }) => {
    try {
      const data = await Comment.update({ comment }, { where: { commentId, userId } });
      return data;
    } catch (error) {
      throw error
    }
  }

  findThisComment = async ({ commentId }) => {
    try {
      const data = await Comment.findByPk(commentId);
      return data;
    } catch (error) {
      throw error
    }
  }

  deleteComment = async ({ commentId, userId }) => {
    try {
      const data = await Comment.destroy({
        where: { commentId, userId },
      });
      return data;
    } catch (error) {
      throw error
    }
  }


}

module.exports = Commentsrepository;