const swaggerAutogen = require('swagger-autogen')();
require('dotenv').config();
const port = process.env.EXPRESS_PORT;

const doc = {
  info: {
    version: '1.0.0',
    title: '4조 MINI SWAGGER~',
    description: '4조 MINI SWAGGER데스',
  },
  host: process.env.EC2 || 'localhost:6060',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'User',
      description: 'Endpoints',
    },
  ],
  securityDefinitions: {
    apiKeyAuth: {
      type: 'apiKey',
      in: 'cookie', // can be "header", "query" or "cookie"
      name: process.env.COOKIE_NAME, // name of the header, query parameter or cookie
      description: 'any description...',
    },
  },
  definitions: {
    signup: {
      father: 'Simon Doe',
      mother: 'Marie Doe',
    },
    User: {
      userId: 1,
      $nickname: 'aaa',
      $password: '1111',
    },
    AddUser: {
      $name: 'Jhon Doe',
      $age: 29,
      about: '',
    },
  },
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./app.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
