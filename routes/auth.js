const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication APIs
 */

/**
 * @swagger
 * /api/auth/rootman:
 *   post:
 *     summary: Admin login
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "admin@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Admin logged in
 */
router.post("/rootman", authController.adminLogin);

/**
 * @swagger
 * /api/auth/register/student:
 *   post:
 *     summary: Register a student
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 123456
 *               name:
 *                 type: string
 *                 example: "John"
 *               email:
 *                 type: string
 *                 example: "john@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 example: "student"
 *     responses:
 *       201:
 *         description: Student registered
 */
router.post("/register/student", authController.registerStudent);

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a user (admin creates teacher or other roles)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John Doe"
 *               email:
 *                 type: string
 *                 example: "example@gmail.com"
 *               password:
 *                 type: string
 *                 example: "123456"
 *               role:
 *                 type: string
 *                 enum: [admin, teacher, student]
 *                 example: "teacher"
 *               teacherId:
 *                 type: integer
 *                 nullable: true
 *                 example: 10025
 *               studentId:
 *                 type: integer
 *                 nullable: true
 *                 example: null
 *     responses:
 *       201:
 *         description: User successfully created
 *       400:
 *         description: Validation or duplicate error
 *       500:
 *         description: Server error
 */
router.post("/register", authController.register);


/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login (Student or Admin)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               teacherId:
 *                 type: integer
 *                 example: 10025
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /api/auth/login/student:
 *   post:
 *     summary: Student login using studentId
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               studentId:
 *                 type: integer
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Student logged in
 */
router.post("/login/student", authController.loginStudent);

module.exports = router;
