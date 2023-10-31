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
 * Get all tracks
 * @swagger
 * /tracks:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "List all tracks"
 *      description: List all tracks with details
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
 * Get track
 * @swagger
 * /tracks/{id}:
 *    get:
 *      tags:
 *        - tracks
 *      summary: "Get track"
 *      description: Get track detail
 *      responses:
 *        '200':
 *          description: Returns track model data stored.
 *        '422':
 *          description: Descriptive error (could be due a validation or an invalid ID error).
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 */
router.get("/:id", authMiddleware, validatorGetItem, getClient);

/**
 * Post new track
 * @swagger
 * /tracks:
 *    post:
 *      tags:
 *        - tracks
 *      summary: "Add track"
 *      description: Add new track with detail
 *      responses:
 *        '200':
 *          description: Returns track inserted in collection.
 *        '422':
 *          description: Descriptive error (could be due a validation or a body request error)
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "body"
 *           name: "body"
 *           description: "Schema collection defined to store a new track"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/track"
 */
router.post(
  "/",
  authMiddleware,
  checkRole(["admin"]),
  validatorCreateItem,
  createClient
);

/**
 * Upadte new track
 * @swagger
 * /tracks/{id}:
 *    put:
 *      tags:
 *        - tracks
 *      summary: "Update track"
 *      description: Update track with detail
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
 *              $ref: "#/definitions/track"
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
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
 * Delete track
 * @swagger
 * /tracks/{id}:
 *    delete:
 *      tags:
 *        - tracks
 *      summary: "Delete track"
 *      description: Delete track detail
 *      responses:
 *        '200':
 *          description: Returns findMedia file property and deleted boolean property.
 *        '422':
 *          description: Descriptive error (could be due a validation or a body request error).
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteClient);

module.exports = router;
