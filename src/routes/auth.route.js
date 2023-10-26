const express = require("express");
const { validatorLogin, validatorRegister } = require("../validators/auth");
const { login, register } = require("../controllers/auth.controller");
const router = express.Router();

/**
 * Register new user
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Register user"
 *      description: User registration.
 *      responses:
 *        '201':
 *          description: Returns the entity object and session token (Authorization header) in the body response.
 *        '403':
 *          description: Descriptive error response.
 *      parameters:
 *        -  in: "body"
 *           name: "user object"
 *           description: "user object"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/register"
 *
 */
router.post("/register", validatorRegister, register);

/**
 * Register new user
 * @swagger
 * /auth/login:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Login user"
 *      description: Obtener la lista de canciones
 *      responses:
 *        '200':
 *          description: Returns the entity object and session token (Authorization header) in the body response.
 *        '401':
 *          description: Descriptive error response.
 *      parameters:
 *        -  in: "body"
 *           name: "login"
 *           description: "email and password"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/login"
 *
 */
router.post("/login", validatorLogin, login);

module.exports = router;
