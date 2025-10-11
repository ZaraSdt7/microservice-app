import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = new Logger('Bootstrap');
  const configService = app.get(ConfigService);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  // Swagger Setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Todo Microservice')
    .setDescription('Todo management microservice API documentation')
    .setVersion('1.0')
    .addTag('todos')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors({
    origin: configService.get<string>('CORS_ORIGIN') || '*',
  });

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);

  logger.log(` Todo Service running on http://localhost:${port}/${globalPrefix}`);
  logger.log(` Swagger docs available at http://localhost:${port}/api/docs`);
}

bootstrap();
