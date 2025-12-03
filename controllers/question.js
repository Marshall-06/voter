const { Question } = require("../models/model");

// Admin adds a question
exports.addQuestion = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });

        const { text } = req.body;

        if (!text || text.trim() === "")
            return res.status(400).json({ message: "Question text is required" });

        const question = await Question.create({ text });

        res.json({ message: "Question added", question });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get all questions (for students)
exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.findAll();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
