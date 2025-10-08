import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { ValidationPipe, Logger, HttpException, ExceptionFilter, Catch, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { LoggerService } from './common/logger/logger.service';
import { AllExceptionsFilter } from './common/exeptionfilters/exeption-filters';

dotenv.config();


async function bootstrap() {

    const app = await NestFactory.create(AppModule , { cors: true });
    app.setGlobalPrefix('api');
    const loggerService = app.get(LoggerService);
    app.useGlobalFilters(new AllExceptionsFilter(loggerService));
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

     const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo App - User Service')
    .setDescription(
      'This service manages user registration, authentication, and roles within the Todo App microservice ecosystem.',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('http://localhost:3001', 'Development Server')
    .addServer('https://api.todoapp.com', 'Production Server')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      docExpansion: 'none',
    },
  });

    const port = process.env.PORT || 3001;
    await app.listen(port);
    Logger.log(`User service running on http://localhost:${port}`);
    Logger.log(`Swagger docs available at http://localhost:${port}/api/docs`);
}
bootstrap();