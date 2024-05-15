class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Call the constructor of the parent class (Error)
    super(message);

    // Set the status code property
    this.statusCode = statusCode;

    // Capture the stack trace for the error
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;
