const express = require('express');
const router = express.Router();
const Likes = require('./likes');
const Posts = require('./posts');
const Comments = require('./comments');
const Users = require('./users');

router.use('/likes', Likes);
router.use('/star/posts', Posts);
router.use('/star/comments', Comments);
router.use('/users/', Users);

module.exports = router;