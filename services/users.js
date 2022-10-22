const UsersRepository = require('../repositories/users');
// const bcrypt = require('bcrypt')

//UserService class를 생성
class Users {
    //UserService class에서 userRepository라는 constructor 생성
    constructor() {
        this.userRepository = new UsersRepository;
    };

    //회원가입
    createUser = async ({
        loginId,
        nickname,
        password,
        confirm,
        profileImgUrl,
        intro,
    }) => {
        //DB에 존재하는 동일 loginid로 User인지 확인
        const isExistUser = await this.userRepository.findUser({ loginId });

        if (isExistUser && isExistUser.loginId === loginId) {
            throw new Error("동일한 ID를 가진 User가 존재합니다.");
        }

        // //bcrypt를 사용해서 password를 암호화 -> hasedPw
        // const salt = await bcrypt.genSalt(5);
        // const hashedPW = await bcrypt.hash(password, salt);

        const user = await this.userRepository.createUser({
            loginId,
            nickname,
            password,
            confirm,
            // hashedPW, // hash 된 password 저장
            profileImgUrl,
            intro,
        });

        return user;
    };

    // 로그인
    userLogin = async (loginId, password) => {
        const loginData = await this.userRepository.userLogin(loginId, password);

        if (loginData === null) return loginData;

        //userLogin에 userID까지 넣어줌 => controller로 가서 userId로 token 생성할 예정
        return {
            loginId: loginData.loginId,
            userId: loginData.userId,
            password: loginData.password
        };
    };

}

module.exports = Users;
