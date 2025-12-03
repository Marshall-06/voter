const { User, Category, Teacher } = require("../models/model");
const auth = require("../middlewares/auth");
// ADMIN -> Assign teacher + subject to group
exports.assign = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can assign teachers" });

    const { teacherId, groupId, subject } = req.body;

    const teacher = await User.findOne({
      where: { id: teacherId, role: "teacher" }
    });

    if (!teacher)
      return res.status(404).json({ message: "Teacher not found" });

    const group = await Category.findByPk(groupId);
    if (!group)
      return res.status(404).json({ message: "Group not found" });

    const assignment = await Teacher.create({
      teacherId,
      groupId,
      subject
    });

    res.json({
      message: "Teacher assigned",
      data: assignment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



exports.getAll = async (req, res) => {
  try {
    const assignments = await Teacher.findAll();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  exports.update = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can update assignment" });

    const { id } = req.params; // assignment ID
    const { teacherId, groupId, subject } = req.body;

    const assignment = await Teacher.findByPk(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    await assignment.update({
      teacherId,
      groupId,
      subject
    });

    res.json({
      message: "Assignment updated successfully",
      data: assignment
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.remove = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can delete assignment" });

    const { id } = req.params;

    const assignment = await Teacher.findByPk(id);
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    await assignment.destroy();

    res.json({ message: "Assignment deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
