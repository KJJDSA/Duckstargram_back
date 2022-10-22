const PostService = require('../services/posts');
// require('dotenv').config();

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    const posts = await this.postService.getPosts();

    res.status(200).json({ data: posts });
  };

  getPostById = async (req, res, next) => {
    const { postId } = req.params;
    const post = await this.postService.findPostById(postId);

    res.status(200).json({ data: post });
  };

  createPost = async (req, res, next) => {
    console.log(req.file); //미들웨어 확인용
    const { userId, nickname } = res.locals.user;
    const { title, content } = req.body;
    const imgUrl = /**req.file.location ||**/ null; // 이미지 데이터X 저장된 경로만 가져옴 // 잠시 주석처리
    if (!req.cookies[process.env.COOKIE_NAME]) {
      res.status(400);
      return;
    }
    const createPostData = await this.postService.createPost({ userId, nickname, title, content, imgUrl }); //imgUrl 잠시 지움

    res.status(201).json({ data: createPostData });
  };

  updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    const userId = res.locals.user.userId;

    await this.postService.updatePost(postId, userId, title, content);

    res.status(204).json({ message: "GOOD" });
  };

  deletePost = async (req, res, next) => {
    const { postId } = req.params;
    const userId = res.locals.user.userId;

    await this.postService.deletePost(postId, userId);

    res.status(204).json({ message: "GOOD" });
  };

  likePost = async (req, res, next) => {
    const { postId } = req.params;
    const { like } = req.body;
    const userId = res.locals.user.userId;

    await this.postService.likePost(postId, like, userId);
    res.status(204).json({ message: "GOOD" });
  };
}

module.exports = PostsController;
