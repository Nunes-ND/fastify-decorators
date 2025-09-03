import { HTTP_STATUS } from '../constants/http-status';

export class HttpError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}

export class NotFoundError extends HttpError {
  constructor(message = 'Not Found') {
    super(HTTP_STATUS.NOT_FOUND, message);
  }
}
