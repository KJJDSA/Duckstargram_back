const UsersService = require('../services/users');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const cookie = require('cookie-parser')
require('dotenv').config();

class Users {
    constructor() {
        this.UsersService = new UsersService();
    }

    //회원가입
    createUser = async (req, res) => {
        try {
            const { loginId, nickname, password, confirm, profileImgUrl, intro } = req.body;

            //입력값이 없을때 걸러주는거
            if (!loginId || !nickname || !password) {
                throw new Error("입력값을 확인해 주세요.");
            }

            const user = await this.UsersService.createUser({
                loginId,
                nickname,
                password,
                confirm,
                profileImgUrl,
                intro,
            });

            res.status(201).json({ data: user });

        } catch (error) {
            console.error(error);
            res.status(error.status || 400);
            res.json({ errorMessage: "회원가입 실패" });
        }
    };

    //로그인
    userLogin = async (req, res, next) => {
        //바디에서 아이디 비번을 가져와서
        const { loginId, password } = req.body;
        const login = await this.UsersService.userLogin(loginId, password);
        const authorization = req.cookies[process.env.COOKIE_NAME];

        //login이 null이면 가입 정보를 못 찾음.
        if (login === null) {
            return res.status(404).send({ errorMessage: "가입 정보를 찾을 수 없습니다" });
        }

        const token = jwt.sign({ userId: login.userId }, process.env.JWT_SECRET_KEY, { expiresIn: '600m' })

        //header에 정보가 있으면 "이미 로그인이 되어있습니다." 반환
        if (authorization) {
            res.status(400).send({
                errorMessage: "이미 로그인이 되어 있습니다."
            });
            return;
        }

        //token 값을 userId로 생성
        res.cookie(process.env.COOKIE_NAME, `Bearer ${token}`, { expiresIn: '600m' })   //hh99 , bearer : token값 엄청긴거
        res.send({ "message": "로그인 성공" })

    };
}

module.exports = Users;