import { Module } from '@nestjs/common';
import { TodoServiceService } from './todo-service.service';
import { TodoServiceController } from './todo-service.controller';

@Module({
  controllers: [TodoServiceController],
  providers: [TodoServiceService],
})
export class TodoServiceModule {}
