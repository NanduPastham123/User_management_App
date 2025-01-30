/**
 * Base class for application-specific errors
 */
class AppError extends Error {
    constructor(message, statusCode, errorType = "ApplicationError") {
        
      super(message || "An unexpected error occurred");
      this.statusCode = statusCode || 500;
      console.log("STATUSCODE::" , statusCode);
      this.errorType = errorType; // Helps in identifying the type of error
      this.isOperational = true; // Marks this as an operational (expected) error
  
      // Capture the stack trace excluding the constructor
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  /**
   * Bad Request Error (400)
   */
  class BadRequestError extends AppError {
    constructor(message = "Bad Request") {
      super(message, 400, "BadRequestError");
    }
  }
  
  /**
   * Not Found Error (404)
   */
  class NotFoundError extends AppError {
    constructor(message = "Resource Not Found") {
      super(message, 404, "NotFoundError");
    }
  }
  
  /**
   * Conflict Error (409)
   */
  class ConflictError extends AppError {
    constructor(message = "Conflict") {
      super(message, 409, "ConflictError");
    }
  }
  
  /**
   * Unauthorized Error (401)
   */
  class UnauthorizedError extends AppError {
    constructor(message = "Unauthorized") {
      super(message, 401, "UnauthorizedError");
    }
  }
  
  /**
   * Validation Error (422)
   */
  class ValidationError extends AppError {
    constructor(message = "Validation Failed") {
      super(message, 422, "ValidationError");
    }
  }
  
  module.exports = { AppError, BadRequestError, NotFoundError, ConflictError,UnauthorizedError, ValidationError };
  