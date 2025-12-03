const { Rating, User, Category, Question, Teacher } = require("../models/model");

// Student rates teacher
exports.rateTeacher = async (req, res) => {
  try {
    const student = req.user;
    if (student.role !== "student")
      return res.status(403).json({ message: "Only students can rate teachers" });

    const { teacherId, groupId, answers } = req.body;

    // Validate input
    if (!teacherId || !groupId || !answers || typeof answers !== "object")
      return res.status(400).json({ message: "teacherId, groupId, and answers are required" });

    // Validate teacher exists
    const teacher = await User.findOne({ where: { id: teacherId, role: "teacher" }});
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Validate group exists
    const group = await Category.findByPk(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Validate teacher assigned to group
    const assigned = await Teacher.findOne({ where: { teacherId, groupId }});
    if (!assigned) return res.status(400).json({ message: "Teacher not assigned to this group" });

    // Convert answers to numbers and validate
    const numericAnswers = {};
    for (let key in answers) {
      numericAnswers[key] = Number(answers[key]);
      if (isNaN(numericAnswers[key]) || numericAnswers[key] < 1 || numericAnswers[key] > 5) {
        return res.status(400).json({ message: `Invalid score for question ${key}` });
      }
    }

    // Calculate average
    const avgScore = Object.values(numericAnswers).reduce((a,b)=>a+b,0) / Object.values(numericAnswers).length;

    // Check if student already rated this teacher
    let rating = await Rating.findOne({ where: { studentId: student.id, teacherId }});
    if (rating) {
      // Update existing rating
      await rating.update({ answers: numericAnswers, avgScore });
      return res.json({ message: "Rating updated successfully", rating });
    }

    // Create new rating
    rating = await Rating.create({
      studentId: student.id,
      teacherId,
      groupId,
      answers: numericAnswers,
      avgScore
    });

    res.json({ message: "Rating submitted successfully", rating });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// Get teacher ratings + questions
exports.getTeacherRatings = async (req, res) => {
    try {
        const { teacherId } = req.params;

        const ratings = await Rating.findAll({ where: { teacherId } });
        const questions = await Question.findAll();

        const result = questions.map(q => ({
            questionId: q.id,
            questionText: q.text,
            answers: ratings.map(r => ({
                studentId: r.studentId,
                score: r.answers[q.id] || null
            }))
        }));

        res.json(result);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
