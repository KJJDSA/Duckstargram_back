const express = require('express');
const router = express.Router();
const Commentscontroller = require('../controllers/comments');
const commentscontroller = new Commentscontroller();
const authMiddleware = require('../middleware/auth-middleware');

router.get('/:postId', commentscontroller.getComments); // 댓글보기는 로그인 없이 가능 
router.post('/:postId', authMiddleware, commentscontroller.postComment);
router.put('/:commentId', authMiddleware, commentscontroller.putComment);
router.delete('/:commentId', authMiddleware, commentscontroller.deleteComment);

module.exports = router;


