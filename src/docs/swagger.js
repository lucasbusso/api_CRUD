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
    client: {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "businessName",
        "email",
        "phone",
        "antiquity",
        "debt",
        "userId",
      ],
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        businessName: {
          type: "string",
        },
        email: {
          type: "string",
        },
        phone: {
          type: "string",
        },
        anquiquity: {
          type: "string",
        },
        debt: {
          type: "number",
        },
        userId: {
          type: "string",
        },
      },
    },
    register: {
      type: "object",
      required: [
        "firstName",
        "lastName",
        "ownBusiness",
        "password",
        "email",
        "role",
      ],
      properties: {
        firstName: {
          type: "string",
        },
        lastName: {
          type: "string",
        },
        ownBusiness: {
          type: "string",
        },
        password: {
          type: "string",
        },
        email: {
          type: "string",
        },
        role: {
          type: "string",
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
  apis: ["src/routes/*.js"],
};

const openapiSpecification = swaggerJsdoc(options);
module.exports = openapiSpecification;
