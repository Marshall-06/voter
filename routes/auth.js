const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth");

// Admin login
router.post("/rootman", authController.adminLogin);
router.post("/register/student", authController.registerStudent);
router.post("/register", authController.register)
router.post("/login", authController.login);
router.post("/login/student", authController.loginStudent)

module.exports = router;