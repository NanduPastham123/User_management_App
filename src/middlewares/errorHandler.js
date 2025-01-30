const express = require("express");
const { AppError } = require("./customErrors");

const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    // Known error type
    console.log("ERRORSSS::::" , err.statusCode);
    return res.status(err.statusCode).json({
      error: {
        message: err.message,
        type: err.errorType,
      },
    });
  }

  // Unknown error (fallback)
  res.status(500).json({
    error: {
      message: "Internal Server Error",
      type: "UnknownError",
    },
  });
};

module.exports = errorHandler;
