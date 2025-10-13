import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AllExceptionsFilter } from './common/all-exceptions.filter';


async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: false });
  const logger = new Logger('Gateway');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new AllExceptionsFilter());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('Gateway for Todo App Microservices')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  const port = process.env.PORT || 3000;
  await app.listen(port);

  logger.log(` Gateway running on http://localhost:${port}/api`);
  logger.log(`Swagger docs: http://localhost:${port}/api/docs`);
}

bootstrap();
