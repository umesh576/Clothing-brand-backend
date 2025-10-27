class customError extends Error {
  success: boolean = false;
  statusCode: number;
  status: string;
  isOperational: boolean;
  constructor(message: string, statusCode: number) {
    super(message);
    (this.message = message), (this.success = false);
    (this.statusCode = statusCode),
      (this.status = statusCode > 400 && statusCode < 500 ? "fail" : "error");
    this.isOperational = true;

    Error.captureStackTrace(this, customError);
  }
}

export default customError;
