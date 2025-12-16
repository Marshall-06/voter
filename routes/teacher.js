const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacher");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

router.post("/assign", authMiddleware, adminOnly, controller.assign);
//assignment id
router.put("/:id", authMiddleware, adminOnly, controller.update);
//assignment id
router.delete("/:id", authMiddleware, adminOnly, controller.remove);
router.get("/", authMiddleware, controller.getAll); // admin view all

router.get("/group/:groupId", authMiddleware, controller.getById);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Teacher
 *   description: Teacher assignment management
 */

/**
 * @swagger
 * /api/teacher/assign:
 *   post:
 *     summary: Assign a teacher to a subject/group (Admin only)
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: integer
 *                 example: 101
 *               groupId:
 *                 type: integer
 *                 example: 5
 *               subject:
 *                 type: string
 *                 example: "Mathematics"
 *     responses:
 *       201:
 *         description: Teacher assigned successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */

/**
 * @swagger
 * /api/teacher/{id}:
 *   put:
 *     summary: Update teacher assignment (Admin only)
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Assignment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: integer
 *                 example: 101
 *               groupId:
 *                 type: integer
 *                 example: 7
 *               subject:
 *                 type: string
 *                 example: "Physics"
 *     responses:
 *       200:
 *         description: Assignment updated successfully
 *       404:
 *         description: Assignment not found
 */

/**
 * @swagger
 * /api/teacher/{id}:
 *   delete:
 *     summary: Delete teacher assignment (Admin only)
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment deleted
 *       404:
 *         description: Assignment not found
 */

/**
 * @swagger
 * /api/teacher:
 *   get:
 *     summary: Get all teacher assignments
 *     tags: [Teacher]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of teacher assignments
 */
