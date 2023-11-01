const express = require("express");
const {
  getAllClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
} = require("../controllers/client.controller");
const {
  validatorCreateItem,
  validatorGetItem,
} = require("../validators/client");
const authMiddleware = require("../middlewares/session");
const checkRole = require("../middlewares/userRole");

const router = express.Router();

/**
 * Get all clients registered
 * @swagger
 * /clients:
 *    get:
 *      tags:
 *        - clients
 *      summary: "List all clients"
 *      description: List all clients with details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns length property and data array with objects stored in DB.
 *        '402':
 *          description: Not allow because you need more permissions.
 */
router.get("/", authMiddleware, getAllClients);

/**
 * Get client
 * @swagger
 * /clients/{id}:
 *    get:
 *      tags:
 *        - clients
 *      summary: "Get client"
 *      description: Get client detail
 *      responses:
 *        '200':
 *          description: Returns client object.
 *        '422':
 *          description: Descriptive error (could be due a validation or an invalid ID error).
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "client ID"
 *           required: true
 *           schema:
 *              type: string
 */
router.get("/:id", authMiddleware, validatorGetItem, getClient);

/**
 * Create new client
 * @swagger
 * /clients:
 *    post:
 *      tags:
 *        - clients
 *      summary: "Create client"
 *      description: Create new client with detail
 *      responses:
 *        '200':
 *          description: Returns client inserted in collection.
 *        '422':
 *          description: Descriptive error (could be due a validation or a body request error)
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "Schema collection defined to store a new client"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/client"
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createClient
);

/**
 * Update client
 * @swagger
 * /clients/{id}:
 *    put:
 *      tags:
 *        - clients
 *      summary: "Update client"
 *      description: Update client
 *      responses:
 *        '200':
 *          description: Returns updated register.
 *        '422':
 *          description: Descriptive error (could be due a validation or a body request error)
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "Model description"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/client"
 *        -  in: "path"
 *           name: "id"
 *           description: "client ID"
 *           required: true
 *           schema:
 *              type: string
 */
router.put(
  "/:id",
  authMiddleware,
  validatorGetItem,
  validatorCreateItem,
  updateClient
);

/**
 * Delete client
 * @swagger
 * /clients/{id}:
 *    delete:
 *      tags:
 *        - clients
 *      summary: "Delete client"
 *      description: Delete client detail
 *      responses:
 *        '200':
 *          description: Response deleted row.
 *        '422':
 *          description: Descriptive error (could be due a validation or a body request error).
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID client"
 *           required: true
 *           schema:
 *              type: string
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteClient);

module.exports = router;
