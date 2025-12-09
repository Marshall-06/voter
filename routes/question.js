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
