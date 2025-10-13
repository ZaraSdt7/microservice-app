import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Bootstrap');

  // Global Prefix & Pipes
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  // Global Exception Filter
  app.useGlobalFilters(new AllExceptionsFilter(logger));

  // Swagger Configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Notification Service')
    .setDescription('API for sending and managing notifications')
    .setVersion('1.0')
    .addTag('notifications')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document);

  //  Connect Microservice (RabbitMQ)
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672'],
      queue: process.env.RABBITMQ_QUEUE || 'notifications_queue',
      queueOptions: { durable: true },
    },
  });

  await app.startAllMicroservices();

  const port = process.env.PORT || 3002;
  await app.listen(port);

  logger.log(` Notification Service running on http://localhost:${port}/api`);
  logger.log(`Swagger docs available at http://localhost:${port}/api/docs`);
  logger.log('Connected to RabbitMQ and listening for events...');
}
bootstrap();
