import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerService } from '../logger/logger.service';


@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
constructor(private readonly logger: LoggerService) {}


catch(exception: unknown, host: ArgumentsHost) {
const ctx = host.switchToHttp();
const response = ctx.getResponse<Response>();
const request = ctx.getRequest<Request>();


let status = HttpStatus.INTERNAL_SERVER_ERROR;
let message = 'Internal server error';


if (exception instanceof HttpException) {
status = exception.getStatus();
const res = exception.getResponse();
message = typeof res === 'string' ? res : (res as any).message || message;
}


// structured logging
this.logger.error('Unhandled exception', { message, path: request.url, exception });


response.status(status).json({
statusCode: status,
timestamp: new Date().toISOString(),
path: request.url,
message,
});
}
}