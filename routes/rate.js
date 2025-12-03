const express = require("express");
const router = express.Router();
const { rateTeacher, getTeacherRatings } = require("../controllers/rate");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

router.post("/", authMiddleware, rateTeacher);
router.get("/:teacherId", authMiddleware, getTeacherRatings);

module.exports = router;
