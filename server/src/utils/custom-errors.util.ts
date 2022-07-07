export class HttpException extends Error {
  message: string;
  statusCode: number;

  constructor(message: string, statusCode?: number) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode || 500;
  }
}
