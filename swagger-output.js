require('dotenv').config();
module.exports = {
  "swagger": "2.0",
  "info": {
    "version": "1.0.0",
    "title": "4조 MINI SWAGGER~",
    "description": "4조 MINI SWAGGER데스"
  },
  "host": process.env.EC2 || "localhost:6060",
  "basePath": "/",
  "tags": [
    {
      "name": "회원가입API",
      "description": ""
    },
    {
      "name": "로그인API",
      "description": ""
    },
    {
      "name": "게시글API",
      "description": ""
    },
    {
      "name": "댓글API",
      "description": ""
    },
    {
      "name": "미완성API",
      "description": "이건 쓰시면 서버 꺼질 수 있어요!!!"
    }
  ],
  "schemes": [
    "http"
  ],
  "securityDefinitions": {
    "apiKeyAuth": {
      "type": "apiKey",
      "in": "cookie",
      "name": "HangHae99",
      "description": "any description..."
    }
  },
  "consumes": [
    "application/json"
  ],
  "produces": [
    "application/json"
  ],
  "paths": {
    "/": {
      "get": {
        "description": "Hello! 를 뱉는 기본API",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      }
    },
    "/api/star/posts/": {
      "get": {
        "description": "",
        "tags": ["게시글API"],
        "parameters": [],
        "responses": {}
      },
      "post": {
        "description": "",
        "tags": ["게시글API"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "title": {
                  "example": "제목"
                },
                "content": {
                  "example": "내용"
                }
              }
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/posts/{postId}": {
      "get": {
        "description": "",
        "tags": ["게시글API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {}
      },
      "put": {
        "description": "",
        "tags": ["게시글API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "title": {
                  "example": "수정할 제목"
                },
                "content": {
                  "example": "수정할 내용"
                }
              }
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "delete": {
        "description": "",
        "tags": ["게시글API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/posts/likes/{postId}": {
      "put": {
        "description": "이건 하시면 서버 꺼짐....",
        "tags": ["미완성API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/comments/{postId}": {
      "get": {
        "description": "",
        "tags": ["댓글API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {}
      },
      "post": {
        "description": "",
        "tags": ["댓글API"],
        "parameters": [
          {
            "name": "postId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "comment": {
                  "example": "코멘트쓰셈"
                }
              }
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/star/comments/{commentId}": {
      "put": {
        "description": "",
        "tags": ["댓글API"],
        "parameters": [
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "string"
          },
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "comment": {
                  "example": "수정할 코멘트 작성하세요."
                }
              }
            }
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      },
      "delete": {
        "description": "",
        "tags": ["댓글API"],
        "parameters": [
          {
            "name": "commentId",
            "in": "path",
            "required": true,
            "type": "string"
          }
        ],
        "responses": {
          "401": {
            "description": "Unauthorized"
          }
        }
      }
    },
    "/api/users/": {
      "get": {
        "description": "기본API(아무 기능 없음)",
        "parameters": [],
        "responses": {
          "200": {
            "description": "OK"
          }
        }
      },
      "post": {
        "description": "회원가입",
        "tags": ["회원가입API"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "loginId": {
                  "example": "아이디"
                },
                "nickname": {
                  "example": "닉네임"
                },
                "password": {
                  "example": "패스워드"
                },
                "confirm": {
                  "example": "패스워드"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    },
    "/api/users/login": {
      "post": {
        "description": "로그인",
        "tags": ["로그인API"],
        "parameters": [
          {
            "name": "body",
            "in": "body",
            "schema": {
              "type": "object",
              "properties": {
                "loginId": {
                  "example": "아이디"
                },
                "password": {
                  "example": "패뜨워드"
                }
              }
            }
          }
        ],
        "responses": {}
      }
    }
  },
  "definitions": {
    "signup": {
      "type": "object",
      "properties": {
        "father": {
          "type": "string",
          "example": "Simon Doe"
        },
        "mother": {
          "type": "string",
          "example": "Marie Doe"
        }
      }
    },
    "User": {
      "type": "object",
      "properties": {
        "loginId": {
          "type": "number",
          "example": 1
        },
        "nickname": {
          "type": "string",
          "example": "aaa"
        },
        "password": {
          "type": "string",
          "example": "1111"
        }
      },
      "required": [
        "nickname",
        "password"
      ]
    },
    "AddUser": {
      "type": "object",
      "properties": {
        "name": {
          "type": "string",
          "example": "Jhon Doe"
        },
        "age": {
          "type": "number",
          "example": 29
        },
        "about": {
          "type": "string",
          "example": ""
        }
      },
      "required": [
        "name",
        "age"
      ]
    }
  }
}