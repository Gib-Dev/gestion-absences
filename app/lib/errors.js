// Custom error classes for consistent error handling
export class AppError extends Error {
  constructor(message, statusCode = 500, code = 'INTERNAL_ERROR') {
    super(message);
    this.name = 'AppError';
    this.statusCode = statusCode;
    this.code = code;
    this.isOperational = true;
  }
}

export class ValidationError extends AppError {
  constructor(message, details = null) {
    super(message, 400, 'VALIDATION_ERROR');
    this.details = details;
  }
}

export class AuthenticationError extends AppError {
  constructor(message = 'Authentication required') {
    super(message, 401, 'AUTHENTICATION_ERROR');
  }
}

export class AuthorizationError extends AppError {
  constructor(message = 'Insufficient permissions') {
    super(message, 403, 'AUTHORIZATION_ERROR');
  }
}

export class NotFoundError extends AppError {
  constructor(resource = 'Resource') {
    super(`${resource} not found`, 404, 'NOT_FOUND');
  }
}

// Error response formatter
export const formatErrorResponse = (error) => {
  if (error instanceof AppError) {
    return {
      error: {
        message: error.message,
        code: error.code,
        statusCode: error.statusCode,
        ...(error.details && { details: error.details })
      }
    };
  }

  // Handle unexpected errors
  console.error('Unexpected error:', error);
  
  return {
    error: {
      message: process.env.NODE_ENV === 'production' 
        ? 'Internal server error' 
        : error.message,
      code: 'INTERNAL_ERROR',
      statusCode: 500
    }
  };
};

// Global error handler
export const handleError = (error, req, res) => {
  const errorResponse = formatErrorResponse(error);
  const statusCode = errorResponse.error.statusCode;

  if (res) {
    return res.status(statusCode).json(errorResponse);
  }

  return errorResponse;
};

// Async error wrapper for API routes
export const asyncHandler = (fn) => {
  return async (req, res) => {
    try {
      await fn(req, res);
    } catch (error) {
      return handleError(error, req, res);
    }
  };
};

