const Commentsservice = require('../services/comments');
const Joi = require('joi');
const pattern = /^[\s\S]{1,255}$/

const commentSchema = Joi.object({
  comment: Joi.string().pattern(pattern).required(),
});

class Commentscontroller {
  commentsservice = new Commentsservice();

  getComments = async (req, res, next) => {
    try {
      const { postId } = req.params;

      const data = await this.commentsservice.getComments({ postId });

      return res.status(200).json({ data })
    } catch (error) {
      console.log(error.name + ":" + error.message)
      return res.status(error.status || 400).send({
        message: "댓글 조회에 실패했습니다.",
        ErrorData: error.name + ":" + error.message
      })
    }
  }

  postComment = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { comment } = req.body;
      const { userId, nickname } = res.locals.user;
      // console.log(nickname)
      const data = await this.commentsservice.postComment({ postId, userId, nickname, comment })
      res.status(201).send("댓글생성성공")
    } catch (error) {
      console.log(error.name + ":" + error.message)
      return res.status(error.status || 400).send({
        message: "댓글 생성에 실패했습니다.",
        ErrorData: error.name + ":" + error.message
      })
    }
  }

  putComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { comment } = req.body;
      const { userId } = res.locals.user;
      const data = await this.commentsservice.putComment({ commentId, userId, comment })
      return res.status(201).send("댓글수정성공")
    } catch (error) {
      console.log(error.name + ":" + error.message)
      return res.status(error.status || 400).send({
        message: "댓글 수정에 실패했습니다.",
        ErrorData: error.name + ":" + error.message
      })
    }
  }

  deleteComment = async (req, res, next) => {
    try {
      const { commentId } = req.params;
      const { userId } = res.locals.user;
      const data = await this.commentsservice.deleteComment({ commentId, userId })
      return res.status(204).send("댓글삭제성공")
    } catch (error) {
      console.log(error.name + ":" + error.message)
      return res.status(error.status || 400).send({
        message: "댓글 삭제에 실패했습니다.",
        ErrorData: error.name + ":" + error.message
      })
    }

  };
}
module.exports = Commentscontroller;