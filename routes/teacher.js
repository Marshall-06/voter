const express = require("express");
const router = express.Router();
const controller = require("../controllers/teacher");
const { authMiddleware, adminOnly } = require("../middlewares/auth");

router.post("/assign", authMiddleware, adminOnly, controller.assign);
router.put("/:id", authMiddleware, adminOnly, controller.update);
router.delete("/:id", authMiddleware, adminOnly, controller.remove);
router.get("/", authMiddleware, controller.getAll);

module.exports = router;
