const express = require('express');
const Http = require('http');
const routes = require('./routes');
const cors = require('cors');

// const swaggerUi = require('swagger-ui-express');
// const swaggerFile = require('./swagger-output.json');

require('dotenv').config();

const cookieParser = require('cookie-parser');
const app = express();
const http = Http.createServer(app);
const port = process.env.EXPRESS_PORT || 6060;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api', routes);

app.use(cors({
  origin: '*', // 출처 허용 옵션
  credential: 'true' // 사용자 인증이 필요한 리소스(쿠키 ..등) 접근
}));

app.get('/', (req, res) => {
  res.send("hello!")
})

// app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

http.listen(port, () => {
  console.log(`${port}로 MINI 서버가 열렸습니당`);
});

module.exports = http;
