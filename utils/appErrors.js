const { StatusCodes,getReasonPhrase } = require('http-status-codes');

class AppError extends Error {
  constructor(code, message, errors) {
    const status = getReasonPhrase(code);
    super(message || status);
    this.code = code;
    this.status = status;
    this.isOperational = true;
    this.errors = errors;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
      status: this.status,
      message: this.message,
      errors: this.errors,
    };
  }
}
class NotFoundError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.NOT_FOUND, message, errors);
  }
}
class InternalError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, message, errors);
  }
}
class AlreadyExistError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.CONFLICT, message || 'Already Exist', errors);
  }
}
class ConflictStateError extends AppError {
  constructor(message, errors) {
    super(
      StatusCodes.CONFLICT,
      message || 'Operation cannot be completed due to a conflict with the current state of the resource.',
      errors,
    );
  }
}
class BadRequestError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.BAD_REQUEST, message, errors);
  }
}
class LimitEssay extends AppError {
  constructor(message, errors) {
    super(StatusCodes.TOO_MANY_REQUESTS, message, errors);
  }
}
class AuthorizationError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.UNAUTHORIZED, message, errors);
  }
}
class ForbiddenError extends AppError {
  constructor(message, errors) {
    super(StatusCodes.FORBIDDEN, message, errors);
  }
}
module.exports = {
  AuthorizationError,
  NotFoundError,
  AlreadyExistError,
  ConflictStateError,
  LimitEssay,
  InternalError,
  BadRequestError,
  ForbiddenError,
};