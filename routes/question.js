const express = require("express");
const router = express.Router();
const { addQuestion, getAllQuestions, deleteQuestion, updateQuestion } = require("../controllers/question");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

// Add a question (Admin only)
router.post("/", authMiddleware, adminOnly, addQuestion);

// Get all questions (Students)
router.get("/", authMiddleware, getAllQuestions);

router.delete("/:id", authMiddleware, adminOnly, deleteQuestion);

router.put("/:id", authMiddleware, adminOnly, updateQuestion);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Question
 *   description: Question management (Admin can add/update/delete, Students can view)
 */

/**
 * @swagger
 * /api/question:
 *   post:
 *     summary: Add a new question (Admin only)
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *             properties:
 *               text:
 *                 type: string
 *                 example: "What is the capital of France?"
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 */

/**
 * @swagger
 * /api/question:
 *   get:
 *     summary: Get all questions (Students)
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all questions
 */

/**
 * @swagger
 * /api/question/{id}:
 *   delete:
 *     summary: Delete a question by ID (Admin only)
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /api/question/{id}:
 *   put:
 *     summary: Update a question by ID (Admin only)
 *     tags: [Question]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Question ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "Updated question title"
 *     responses:
 *       200:
 *         description: Question updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Admin only
 *       404:
 *         description: Question not found
 */
