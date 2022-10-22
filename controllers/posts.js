const PostService = require('../services/posts');
// require('dotenv').config();

class PostsController {
  postService = new PostService();

  getPosts = async (req, res, next) => {
    try {
      const posts = await this.postService.getPosts();

      res.status(200).json({ data: posts });

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }
  };

  getPostById = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const post = await this.postService.findPostById(postId);

      res.status(200).json({ data: post });

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }
  };

  createPost = async (req, res, next) => {
    try {
      console.log(req.file); //미들웨어 확인용
      const { userId, nickname } = res.locals.user;
      const { title, content } = req.body;
      const imgUrl = /**req.file.location ||**/ null; // 이미지 데이터X 저장된 경로만 가져옴 // 잠시 주석처리
      if (!req.cookies[process.env.COOKIE_NAME]) {
        res.status(400);
        return;
      }
      const createPostData = await this.postService.createPost({ userId, nickname, title, content, imgUrl }); //imgUrl 잠시 지움

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }

    res.status(201).json({ data: createPostData });
  };

  updatePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { title, content } = req.body;
      const userId = res.locals.user.userId;

      await this.postService.updatePost(postId, userId, title, content);

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }
  };

  deletePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const userId = res.locals.user.userId;

      await this.postService.deletePost(postId, userId);

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }
  };

  likePost = async (req, res, next) => {
    try {
      const { postId } = req.params;
      const { like } = req.body;
      const userId = res.locals.user.userId;

      await this.postService.likePost(postId, like, userId);
      res.status(204).json({ message: "GOOD" });

    } catch (error) {
      console.log(`${error.name}:${error.message}`)
      res.status(400).json({ Type: error.name, Message: error.message })
    }
  };
}

module.exports = PostsController;
