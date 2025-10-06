import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe, Logger, HttpException, ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import * as dotenv from 'dotenv';
import { HttpExceptionFilter } from './common/exeptionfilters/exeption-filters';



async function bootstrap() 
{
    dotenv.config();
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalFilters(new HttpExceptionFilter());
    app.use(helmet());
    app.use(rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100
    }));
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true
    }));
    const port = process.env.PORT || 3001;
    await app.listen(port);
    Logger.log(`User service running on http://localhost:${port}`);
}
bootstrap();