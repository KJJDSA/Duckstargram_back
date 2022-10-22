const express = require('express');
const app = express();
const Http = require('http');
const http = Http.createServer(app);
const routes = require('./routes');

const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger-output.js');

const cors = require('cors');
require('dotenv').config();
// const multerS3 = require('multer-s3');
// const multer = require('multer');
// const path = require('path');
// const AWS = require('aws-sdk');

// AWS.config.update({
//   accessKetId: process.env.AWS_ACCESS_KEY_ID,
//   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   region: 'ap-northeast-2',
// });

// const upload = multer({
//   storage: multerS3({
//     s3: new AWS.S3(),
//     bucket: 'team4-mini',
//     key(req, file, cb) {
//       cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
//     },
//   }),
//   limits: { fileSize: 5 * 2000 * 2000 },
// });

const port = process.env.EXPRESS_PORT;
const cookieParser = require('cookie-parser');

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/public', express.static('public'));
app.use('/api', /**upload.array('many'),**/ routes);

app.get('/', (req, res) => {
  res.send('hello!');
});
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile));

http.listen(port, () => {
  console.log(`${port}로 MINI 서버가 열렸습니당`);
});

module.exports = http;
