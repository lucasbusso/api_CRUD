const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Rest API - Lucas Busso",
    description: "Te dejo el repo: https://github.com/lucasbusso/api_CRUD",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
      description: "Development server",
    },
  ],
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
  definitions: {
    track: {
      type: "object",
      required: ["name", "album", "cover", "artist", "duration", "mediaId"],
      properties: {
        name: {
          type: "string",
        },
        album: {
          type: "string",
        },
        cover: {
          type: "string",
        },
        mediaId: {
          type: "string",
        },
        artist: {
          type: "object",
          properties: {
            name: {
              type: "string",
            },
            nickname: {
              type: "string",
            },
            nationality: {
              type: "string",
            },
          },
        },
        duration: {
          type: "object",
          properties: {
            start: {
              type: "integer",
            },
            end: {
              type: "integer",
            },
          },
        },
      },
    },
    register: {
      type: "object",
      required: ["name", "password", "email", "age"],
      properties: {
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
        email: {
          type: "string",
        },
        age: {
          type: "number",
        },
      },
    },
    login: {
      type: "object",
      required: ["email", "password"],
      properties: {
        email: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
    upload: {
      type: "object",
      required: ["key", "value"],
      properties: {
        key: {
          type: "string",
        },
        value: {
          type: "file",
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
