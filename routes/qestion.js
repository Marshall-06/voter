const express = require("express");
const router = express.Router();
const { addQuestion, getAllQuestions } = require("../controllers/question");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

// Add a question (Admin only)
router.post("/", authMiddleware, adminOnly, addQuestion);

// Get all questions (Students)
router.get("/", authMiddleware, getAllQuestions);

module.exports = router;
