export class ApplicationError extends Error {
  message: string;
  status: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  extra?: any;

  constructor(message: string, status: number, extra = {}) {
    super(message);
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || "Something went wrong. Please try again.";
    this.status = status || 500;
    this.extra = extra;
  }
}
