const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/auth-middleware');
require('dotenv').config();
const upload = require('../middleware/upload-middleware');

const PostsController = require('../controllers/posts');
const postsController = new PostsController();

router.get('/', postsController.getPosts);
router.get('/:postId', postsController.getPostById);
//이미지를 업로드받고 저장경로를 client에 전달해줌 미들웨어의 정적파일을 제공하는 라우터
router.post('/', authMiddleware, upload.single('many'), postsController.createPost); //single, for문? db엔 어떻게,, //upload.array('many'),
router.put('/:postId', authMiddleware, postsController.updatePost);
router.delete('/:postId', authMiddleware, postsController.deletePost);
router.put('/likes/:postId', authMiddleware, postsController.likePost);

module.exports = router;
