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

exports.deleteQuestion = async (req, res) => {
    try {
        if (req.user.role !== "admin")
            return res.status(403).json({ message: "Admin only" });
        const { id } = req.params;

        const question = await Question.findByPk(id);
        if (!question)
            return res.status(404).json({ message: "Question not found" });
        await question.destroy();

        res.json({ message: "Question deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateQuestion = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Admin only" });
    const { id } = req.params;
    const { text } = req.body;

    const question = await Question.findByPk(id);
    if (!question)
      return res.status(404).json({ message: "Question not found" });
    question.text = text || question.text;
    await question.save();
    res.json({ message: "Question updated", question });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
