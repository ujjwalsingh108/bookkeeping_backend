const AppError = require("../utils/appError");

// Handle invalid JWT
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

// Handle expired JWT
const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please login again.", 401);

module.exports = (err, req, res, next) => {
  // Set default error properties
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  // JWT-specific errors
  if (err.name === "JsonWebTokenError") err = handleJWTError();
  if (err.name === "TokenExpiredError") err = handleJWTExpiredError();

  // Send error response
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
