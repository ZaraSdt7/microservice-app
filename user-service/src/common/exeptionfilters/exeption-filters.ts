import { Catch, HttpException, ExceptionFilter, ArgumentsHost, HttpStatus } from "@nestjs/common";

@Catch(HttpException)
 export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = typeof (exception as any).getStatus === 'function' ? (exception as any).getStatus() : HttpStatus.INTERNAL_SERVER_ERROR;
        const exceptionResponse = typeof (exception as any).getResponse === 'function' ? (exception as any).getResponse() : null;
        const message =
            exceptionResponse && typeof exceptionResponse === 'object' && (exceptionResponse as unknown as { message: string }).message
                ? (exceptionResponse as unknown as { message: string }).message
                : (exception as any).message || null;
        response.status(status).json({
            statusCode: status,
            message,
            timestamp: new Date().toISOString(),
            path: request.url,
        });
    }
}