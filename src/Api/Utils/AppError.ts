export interface AppErrorAttributes {
  statusCode: number;
  message: string;
}

class AppError extends Error {
  public statusCode: number;
  public message: string;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.message = message;
    this.statusCode = statusCode;

    Object.setPrototypeOf(this, AppError.prototype);

    Error.captureStackTrace(this);
  }
}

export default AppError;
