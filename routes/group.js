const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/group");
const { authMiddleware, adminOnly } = require("../middlewares/auth");


router.get("/", categoryController.getAllCategories);
router.get("/single/:id", categoryController.getSingleCategory);
router.post("/add", authMiddleware, adminOnly, categoryController.addCategory);
router.put("/update/:id",authMiddleware, adminOnly, categoryController.updateCategory);
router.delete("/delete/:id",authMiddleware, adminOnly, categoryController.deleteCategory);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Group
 *   description: Manage student groups (Admin only for modification)
 */

/**
 * @swagger
 * /api/group:
 *   get:
 *     summary: Get all groups
 *     tags: [Group]
 *     responses:
 *       200:
 *         description: List of all groups
 */

/**
 * @swagger
 * /api/group/single/{id}:
 *   get:
 *     summary: Get a single group by ID
 *     tags: [Group]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Group found
 *       404:
 *         description: Group not found
 */

/**
 * @swagger
 * /api/group/add:
 *   post:
 *     summary: Create a new group (Admin only)
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Physics Group A"
 *     responses:
 *       201:
 *         description: Group successfully created
 *       401:
 *         description: Unauthorized (no token)
 *       403:
 *         description: Forbidden (not admin)
 */

/**
 * @swagger
 * /api/group/update/{id}:
 *   put:
 *     summary: Update an existing group (Admin only)
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Updated Group A"
 *     responses:
 *       200:
 *         description: Group updated successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Group not found
 */

/**
 * @swagger
 * /api/group/delete/{id}:
 *   delete:
 *     summary: Delete a group (Admin only)
 *     tags: [Group]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         example: 1
 *     responses:
 *       200:
 *         description: Group deleted successfully
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (Admin only)
 *       404:
 *         description: Group not found
 */
