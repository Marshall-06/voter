const { User, Category, Teacher } = require("../models/model");
const auth = require("../middlewares/auth");
// ADMIN -> Assign teacher + subject to group
exports.assign = async (req, res) => {
  try {
    if (req.user.role !== "admin")
      return res.status(403).json({ message: "Only admin can assign teachers" });

    const { teacherId, groupId, subject } = req.body;

    if (!teacherId || !groupId || !subject) {
      return res.status(400).json({ message: "teacherId, groupId, and subject are required" });
    }

    // Check teacher exists
    const teacher = await User.findOne({
      where: { id: teacherId, role: "teacher" }
    });
    if (!teacher) return res.status(404).json({ message: "Teacher not found" });

    // Check group exists
    const group = await Category.findByPk(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // ✅ Check if this exact assignment (teacher + group + subject) exists
    const existingAssignment = await Teacher.findOne({
      where: { teacherId, groupId, subject }
    });

    if (existingAssignment) {
      return res.status(400).json({
        message: "This teacher is already assigned to this group for this subject"
      });
    }

    // Create assignment
    const assignment = await Teacher.create({ teacherId, groupId, subject });

    res.json({ message: "Teacher assigned successfully", data: assignment });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const { groupId } = req.params;

    // Fetch all teachers assigned to the group, including user info
    const teachers = await Teacher.findAll({
      where: { groupId },
      include: [
        {
          model: User,
          as: "teacherUser", // Must match the alias in your association
          attributes: ["teacherId", "name"] // Only manual teacherId and name
        }
      ]
    });

    if (!teachers.length) return res.json([]);

    // Aggregate subjects per teacher
    const teacherMap = {};

    teachers.forEach(t => {
      const tId = t.teacherId; // manual teacherId
      if (!teacherMap[tId]) {
        teacherMap[tId] = {
          teacherId: tId,
          name: t.teacherUser?.name || "Unknown",
          subjects: t.subject ? [t.subject] : []
        };
      } else {
        if (t.subject && !teacherMap[tId].subjects.includes(t.subject)) {
          teacherMap[tId].subjects.push(t.subject);
        }
      }
    });

    // Return array of teachers with their subjects
    res.json(Object.values(teacherMap));

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



exports.getAll = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admin can view all teachers" });
    }

    // Fetch all teacher assignments with correct aliases
    const assignments = await Teacher.findAll({
      include: [
        {
          model: User,
          as: "teacherUser", // must match your models.js association
          attributes: ["id", "name", "email"],
          required: true
        },
        {
          model: Category,
          as: "groupInfo", // must match your models.js association
          attributes: ["id", "name"],
          required: true
        }
      ]
    });

    // Format the response
    const result = assignments.map(a => ({
      teacherId: a.teacherId,
      teacherName: a.teacherUser ? a.teacherUser.name : "Unknown",
      teacherEmail: a.teacherUser ? a.teacherUser.email : "Unknown",
      groupId: a.groupId,
      groupName: a.groupInfo ? a.groupInfo.name : "Unknown",
      subject: a.subject
    }));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};



exports.getTeachersByGroup = async (req, res) => {
  try {
    const { groupId } = req.params;

    const assignedTeachers = await Teacher.findAll({
      where: { groupId },
      include: [{ model: User, as: "teacher", attributes: ["id", "name"] }]
    });

    const teachers = assignedTeachers.map(t => ({
      id: t.teacher.id,
      name: t.teacher.name,
      subjects: [t.subject] // list of subjects for that teacher in this group
    }));

    res.json(teachers);
  } catch (err) {
    console.error(err);
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
