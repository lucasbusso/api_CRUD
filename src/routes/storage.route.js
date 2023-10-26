const express = require("express");
const router = express.Router();
const upload = require("../utils/handleStorage");
const validatorGetItem = require("../validators/storage");
const authMiddleware = require("../middlewares/session");

const {
  createStorageRecord,
  getStorageList,
  getStorageDetail,
  deleteStorageRecord,
} = require("../controllers/storage.controller");

/**
 * Get list storages
 * @swagger
 * /storage:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Get list storage"
 *      description: Get list storage
 *      responses:
 *        '200':
 *          description: Returns length property and data array with objects stored in DB.
 *        '422':
 *          description: Session error (Authorization header).
 *      security:
 *        - bearerAuth: []
 *    responses:
 *      '201':
 *        description: Returns length property and data array with objects stored in DB
 *
 */
router.get("/", authMiddleware, getStorageList);

/**
 * Detalle track
 * @swagger
 * /storage/{id}:
 *    get:
 *      tags:
 *        - storage
 *      summary: "Track details"
 *      description: Track details
 *      responses:
 *        '200':
 *          description: Returns an object with the properties url, filename, deleted, createdAt, updatedAt
 *        '403':
 *          description: Validation error or invalid ID.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "Track id"
 *           required: true
 *           schema:
 *              type: string
 */
router.get("/:id", authMiddleware, validatorGetItem, getStorageDetail);

/**
 * Upload file storage
 * @swagger
 * /storage:
 *    post:
 *      tags:
 *        - storage
 *      summary: "Post single file"
 *      description: List all storage with details
 *      security:
 *        - bearerAuth: []
 *      responses:
 *        '200':
 *          description: Returns an object with the properties url, filename, deleted, createdAt, updatedAt
 *        '402':
 *          description: Not allow because you need more permissions
 *      parameters:
 *        -  in: "body"
 *           name: "form-data"
 *           description: "key: myfile - value: file.ext"
 *           required: true
 *           schema:
 *              $ref: "#/definitions/upload"
 */
router.post("/", authMiddleware, upload.single("myfile"), createStorageRecord);

/**
 * Delete storage
 * @swagger
 * /storage/{id}:
 *    delete:
 *      tags:
 *        - storage
 *      summary: "Delete file"
 *      description: Delete file
 *      responses:
 *        '200':
 *          description: Returns findMedia file property and deleted boolean property.
 *        '422':
 *          description: Error de validacion.
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "Track id"
 *           required: true
 *           schema:
 *              type: string
 *
 */
router.delete("/:id", authMiddleware, validatorGetItem, deleteStorageRecord);

module.exports = router;
