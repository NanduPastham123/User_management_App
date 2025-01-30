const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.js");
const Role = require("../models/role.js"); // Assuming roles are in a separate model (e.g., `Role`)
const sequelize = require("../config/database");
const { invalidateUserCache } = require('./cacheController.js')
const { BadRequestError, UnauthorizedError, ConflictError, NotFoundError } = require("../middlewares/customErrors.js");


/**
 * @description create a new user
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @method POST/createUser
 */
const createUser = async (req, res, next) => {
  const t = await sequelize.transaction(); // Start transaction
  try {
    const { name, email, password, role } = req.body;
    // Validate input
    if (!name || !email || !password) {
      throw new BadRequestError("Name, email, and password are required.");
    }
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new ConflictError("Email already in use.");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = await User.create(
      { name, email, password: hashedPassword },
      { transaction: t }
    );

    // Find the role
    const userRole = await Role.findOne({ where: { name: role } });
    if (!userRole) {
      await t.rollback();
      throw new BadRequestError("Role not found.");
    }

    // Associate the user with the role
    await newUser.addRole(userRole, { transaction: t });

    // Commit transaction
    await t.commit();
    // Invalidating both the users list and the specific user cache
    invalidateUserCache(newUser.id);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    // Rollback the transaction only if it's not finished
    if (!t.finished) {
      await t.rollback();
    }
    next(error);
  }
};


/**
 * @description generate a token based login credentials for role admin or user
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @method POST/generateTokenForLoggedInUser
 */
const generateTokenForLoggedInUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Email and password are required.");
    }
    // Find the user by email and include roles through the UserRoles table
    const user = await User.findOne({
      where: { email },
      include: {
        model: Role, // Role model association
        through: { attributes: [] }, // Exclude the join table attributes
        attributes: ["name"], // Only fetch the role name
      },
    });
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    // Compare the provided password with the stored hashed password
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new UnauthorizedError("Invalid credentials");
    }

    // Extract roles from the associated roles
    const roles = user.Roles.map((role) => role.name);

    // Create a JWT token and include the roles in the payload
    const token = jwt.sign(
      { id: user.id, email: user.email, roles }, // Include roles in the token payload
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the token and roles
    res.status(200).json({ token, roles });
  } catch (error) {
    next(error);
  }
};


module.exports = { createUser, generateTokenForLoggedInUser };
