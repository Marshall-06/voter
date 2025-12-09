const express = require("express");
const router = express.Router();
const { rateTeacher, getTeacherRatings } = require("../controllers/rate");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

router.post("/", authMiddleware, rateTeacher);
router.get("/:teacherId", authMiddleware, adminOnly, getTeacherRatings);

module.exports = router;



/**
 * @swagger
 * tags:
 *   name: Rate
 *   description: Teacher rating system (Students rate teachers)
 */

/**
 * @swagger
 * /api/rate:
 *   post:
 *     summary: Submit or update a rating for a teacher (Students only)
 *     tags: [Rate]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - teacherId
 *               - groupId
 *               - answers
 *             properties:
 *               teacherId:
 *                 type: integer
 *                 example: 7
 *                 description: ID of the teacher being rated
 *               groupId:
 *                 type: integer
 *                 example: 5
 *                 description: ID of the group
 *               answers:
 *                 type: object
 *                 description: Key-value pairs of questionId and score (1-5). Supports any number of questions.
 *                 example: {
 *                   "1": 5,
 *                   "2": 4,
 *                   "3": 5,
 *                   "4": 3,
 *                   "5": 4,
 *                   "6": 5,
 *                   "7": 4,
 *                   "8": 5,
 *                   "9": 5,
 *                   "10": 4
 *                 }
 *     responses:
 *       200:
 *         description: Rating submitted or updated successfully
 *       400:
 *         description: Validation error (missing fields, invalid scores, teacher not assigned)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Only students can rate teachers
 *       404:
 *         description: Teacher or group not found
 *       500:
 *         description: Server error
 */


/**
 * @swagger
 * /api/rate/{teacherId}:
 *   get:
 *     summary: Get all ratings for a teacher (includes questions and student scores)
 *     tags: [Rate]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: teacherId
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the teacher
 *         example: 101
 *     responses:
 *       200:
 *         description: List of questions with all student scores for the teacher
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   questionId:
 *                     type: integer
 *                     example: 1
 *                   questionText:
 *                     type: string
 *                     example: "How clear is the teacher's explanation?"
 *                   answers:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         studentId:
 *                           type: integer
 *                           example: 202
 *                         score:
 *                           type: integer
 *                           example: 5
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Teacher not found
 *       500:
 *         description: Server error
 */
