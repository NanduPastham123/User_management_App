const Joi = require("joi");
const { ValidationError } = require("../middlewares/customErrors.js");
/**
 * @description Joi validation schema for user creation
 */
const userValidator = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "string.base": "Name should be a string",
    "string.min": "Name should have a minimum length of 3 characters",
    "string.max": "Name should have a maximum length of 30 characters",
    "any.required": "Name is required",
  }),
  email: Joi.string()
    .pattern(/^.+@gmail\.com$/)
    .required()
    .messages({
      "string.base": "Email should be a string",
      "string.pattern.base": "Please provide a valid email address with '@gmail.com'",
      "any.required": "Email is required",
    }),

  password: Joi.string().min(6).required().messages({
    "string.base": "Password should be a string",
    "string.min": "Password should have a minimum length of 6 characters",
    "any.required": "Password is required",
  }),
  role: Joi.string().valid("admin", "user").optional().messages({
    "string.base": "Role should be a string",
    "any.only": "Role must be either 'admin' or 'user'",
  }),
});
//Validate the user input
const validateUserInput = (req, res, next) => {
  const { error } = userValidator.validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message); // You can customize the error message here
  }
  next();
};

/**
 * @description Joi validation schema for login creation
 */
const loginValidator = Joi.object({
  email: Joi.string()
  .pattern(/^.+@gmail\.com$/)
  .required()
  .messages({
    "string.base": "Email should be a string",
    "string.pattern.base": "Please provide a valid email address with '@gmail.com'",
    "any.required": "Email is required",
  }),

  password: Joi.string()
    .min(6) // You can adjust the minimum length according to your security needs
    .required()
    .messages({
      "string.base": "Password should be a string.",
      "string.min": "Password must be at least 6 characters long.",
      "any.required": "Password is required."
    })
});
//Validate the user input
const validateLoginUser = (req,res,next) => {
  const { error } = loginValidator.validate(req.body);
  if (error) {
    throw new ValidationError(error.details[0].message); // You can customize the error message here
  }
  next();
};
module.exports = { validateUserInput,validateLoginUser };
