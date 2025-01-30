const express = require("express");
const { generateTokenForLoggedInUser, createUser } = require("../controllers/authController");
const { validateUserInput, validateLoginUser } = require("../validations/userValidation");
const router = express.Router();

router.post("/register", validateUserInput, createUser);
router.post("/login", validateLoginUser, generateTokenForLoggedInUser);

module.exports = router;
