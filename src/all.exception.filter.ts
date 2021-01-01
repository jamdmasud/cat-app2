import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, BadRequestException, BadGatewayException, UnauthorizedException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const message = exception instanceof HttpException
                    ? exception.message
                    : exception instanceof BadGatewayException
                    ? exception.message
                    : exception instanceof UnauthorizedException
                    ? "Please login to access the app"
                    : exception.toString();

    response
      .status(status)
      .json({
        message: message,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url
      });
  }
}