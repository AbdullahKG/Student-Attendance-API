const AppError = require('./../utils/appError');

// Handle duplicate field error (unique constraint violation)
const handleDuplicateFieldsDB = (err) => {
  const value = err.sqlMessage.match(/'(.*?)'/)?.[1]; // Safely extract the value
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

// Handle unknown column error (e.g., typo in column name)
const handleUnknownColumnErrorDB = (err) => {
  const message = `Unknown column error: ${err.sqlMessage}. Please check your query.`;
  return new AppError(message, 400);
};

// Handle foreign key constraint error
const handleForeignKeyConstraintErrorDB = (err) => {
  const message = `Foreign key constraint error: ${err.sqlMessage}. Ensure the referenced key exists.`;
  return new AppError(message, 400);
};

// General validation error handler for custom validations
const handleValidationErrorDB = (err) => {
  const message = `Validation error: ${err.sqlMessage}. Please check your input.`;
  return new AppError(message, 400);
};

// Send detailed error during development
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// Send limited error details during production
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error('ERROR 💥', err);

    res.status(500).json({
      status: 'error',
      message: 'Something went very wrong!',
    });
  }
};

// Global error-handling middleware
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (err.parent) error.parent = err.parent;

    // Handle MySQL specific errors
    if (error.parent?.code === 'ER_DUP_ENTRY')
      error = handleDuplicateFieldsDB(error.parent); // 1062
    if (error.parent?.code === 'ER_BAD_FIELD_ERROR')
      error = handleUnknownColumnErrorDB(error.parent); // 1054
    if (error.parent?.code === 'ER_NO_REFERENCED_ROW_2')
      error = handleForeignKeyConstraintErrorDB(error.parent); // 1452

    if (error.parent?.code === 'ER_TRUNCATED_WRONG_VALUE')
      error = handleValidationErrorDB(error.parent);

    sendErrorProd(error, res);
  }
};
