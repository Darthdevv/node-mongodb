import appError from "../utils/appError.js";

// Unsupported 404 routes
export const notFound = (req, res, next) => {
  next(new appError(`Can't find ${req.originalUrl} on this server`, 400));
};

// Global Error Handling Middleware
export const errorHandler = (err, req, res, next) => {
  if (req.headerSent) {
    return next(err);
  }

  res
    .status(err.code || 500)
    .json({ message: err.message || "Something went wrong 🤦🏻‍♂️" });
};
