const Commentsrepository = require('../repositories/comments.js');
const Joi = require('joi');
const pattern = /^[\s\S]{1,255}$/

const commentSchema = Joi.object({
  comment: Joi.string().pattern(pattern).required(),
});

class Commentsservice {
  commentsrepository = new Commentsrepository()

  getComments = async ({ postId }) => {
    try {
      const data = await this.commentsrepository.getComments({ postId });
      return data;
    } catch (error) {
      throw error
    }
  }

  postComment = async ({ postId, userId, nickname, comment }) => {
    try {
      const data = await this.commentsrepository.postComment({ postId, userId, nickname, comment });

      return data;
    } catch (error) {
      throw error
    }
  }

  putComment = async ({ commentId, userId, comment }) => {
    try {
      const findCommentResult = await this.commentsrepository.findThisComment({ commentId });
      if (!findCommentResult) throw { status: 404, name: "Service", message: "댓글이 없습니다." }
      if (findCommentResult.userId !== userId) throw { name: "Service", message: "댓글을 수정할 권한이 없습니다." }
      const data = await this.commentsrepository.putComment({ commentId, userId, comment });
      if (data[0] !== 1) throw { name: "Service", message: "댓글이 수정되지 않았습니다." }
      return data;
    } catch (error) {
      throw error
    }
  }


  deleteComment = async ({ commentId, userId }) => {
    try {
      const findCommentResult = await this.commentsrepository.findThisComment({ commentId });
      if (!findCommentResult) throw { status: 404, name: "Service", message: "댓글이 없습니다." }
      if (findCommentResult.userId !== userId) throw { name: "Service", message: "댓글을 삭제할 권한이 없습니다." }
      const data = await this.commentsrepository.deleteComment({ commentId, userId }); if (data !== 1) throw { name: "Service", message: "댓글이 삭제되지 않았습니다." }
      return data;
    } catch (error) {
      throw error
    }
  }
}

module.exports = Commentsservice;