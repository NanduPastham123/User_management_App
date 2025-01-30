const express = require("express");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const { authenticate } = require("../middlewares/authMiddleware");
const { authorizeRole } = require("../middlewares/authorizeMiddleware");

const router = express.Router();

router.use(authenticate);

router.get("/",authorizeRole("admin"), getAllUsers);
router.get("/:id", getUserById);
router.put("/:id", authorizeRole("admin"), updateUser);
router.delete("/:id", authorizeRole("admin"), deleteUser);

module.exports = router;
