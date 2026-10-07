import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class SafeExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(SafeExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Unable to send message';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const payload = exception.getResponse();

      if (status === HttpStatus.TOO_MANY_REQUESTS) {
        message = 'Too many requests';
      } else if (status === HttpStatus.BAD_REQUEST) {
        message = 'Invalid request';
        if (typeof payload === 'object' && payload && 'message' in payload) {
          const details = (payload as { message?: string | string[] }).message;
          if (Array.isArray(details)) {
            message = details[0] ?? message;
          } else if (typeof details === 'string') {
            message = details;
          }
        }
      } else if (status >= HttpStatus.INTERNAL_SERVER_ERROR) {
        message = 'Unable to send message';
      } else if (
        typeof payload === 'object' &&
        payload &&
        'message' in payload
      ) {
        const details = (payload as { message?: string | string[] }).message;
        message = Array.isArray(details)
          ? (details[0] ?? message)
          : (details ?? message);
      }
    } else {
      this.logger.error(
        exception instanceof Error ? exception.stack : 'Unhandled server error',
      );
    }

    response.status(status).json({
      success: false,
      message,
    });
  }
}
