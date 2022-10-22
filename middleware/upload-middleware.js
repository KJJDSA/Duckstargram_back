const multerS3 = require('multer-s3');
const multer = require('multer');
const path = require('path');
const AWS = require('aws-sdk');
console.log(AWS, '1234');

AWS.config.update({
  accessKetId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: 'ap-northeast-2',
});

const upload = multer({
  storage: multerS3({
    s3: new AWS.S3(),
    bucket: 'team4-mini',
    key(req, file, cb) {
      cb(null, `original/${Date.now()}${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 5 * 2000 * 2000 },
});
console.log(upload);

module.exports = upload;
