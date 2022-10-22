const jwt = require("jsonwebtoken");
const { User } = require("../models");
// require('dotenv').config();

module.exports = (req, res, next) => {
    const authorization = req.cookies[process.env.COOKIE_NAME];

    const [authType, authToken] = (authorization || "").split(" ");
    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
        return;
    }

    res.locals.authToken = authToken;

    try {
        const { userId } = jwt.verify(authToken, process.env.JWT_SECRET_KEY);
        User.findOne({ where: { userId } }).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능한 기능입니다.",
        });
    }
};