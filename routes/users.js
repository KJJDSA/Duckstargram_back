const express = require('express');
const router = express.Router();

//user.controller로 부터 module을 받아와서 usersController에 할당
const UserController = require('../controllers/users')
const usersController = new UserController();

router.get('/', (req, res) => {
  res.send(`/api/users로 들어오면 이 화면이 보입니다. //////
  회원가입 : /api/user로 post data 보내주시면 됩니다. /////////
  로그인 : /api/user/login으로 post data 보내주시면 됩니다.`)
})

//user를 생성하는 라우터 (회원가입)
router.post('/', usersController.createUser);

//로그인 라우터
router.post('/login', usersController.userLogin);


module.exports = router;