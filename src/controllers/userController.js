const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { setCache, getCache, invalidateUserCache } = require('./cacheController.js')
const { BadRequestError, NotFoundError } = require("../middlewares/customErrors.js");

/**
 * @description Get all users information
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @method GET/getAllUsers
 */
const getAllUsers = async (req, res, next) => {
  try {
    // Check if the users data is cached
    const cacheData = await getCache('users');
    if (cacheData) {
      // Return cached data if available
      return res.status(200).json(JSON.parse(cacheData));
    }
    // If not cached, fetch from the database
    const users = await User.findAll();
    // Set the cache for future requests
    setCache('users', users);
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get single user information by user Id
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function. 
 * @method GET/getUserById
 */
const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    // Check if the user data is cached
    const cacheData = await getCache(`user:${id}`);
    if (cacheData) {
      // Return cached data if available
      return res.status(200).json(JSON.parse(cacheData));
    }

    // If not cached, fetch from the database
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError('User not found.');
    }
    // Set the cache for future requests
    setCache(`user:${id}`, user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update user information with administrative access.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @method POST/updateUser
 */
const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    // Validate input
    if (!name || !email || !password) {
      throw new BadRequestError("Name, email, and password are required.");
    }

    // Find user
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    // Hash password if it's updated
    let hashedPassword = password;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user data
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.password = hashedPassword;

    await user.save();
    // Invalidate the cache after creating a user
    invalidateUserCache(newUser.id);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Deletes a user. Requires administrative access.
 * @param {Object} req - The HTTP request object.
 * @param {Object} res - The HTTP response object.
 * @param {Function} next - The next middleware function.
 * @method DELETE /deleteUser
 */
const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      throw new NotFoundError("User not found.");
    }

    await user.destroy();
    // Invalidate the cache after deleting a user
    invalidateUserCache(id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};


module.exports = { getAllUsers, getUserById, updateUser, deleteUser };
