import { Injectable, Inject, Logger, InternalServerErrorException } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CreateUserDto } from '../../user-service/src/user/dto/create-user.dto';
import { CreateTodoDto } from '../../todo-service/src/todo/dto/create-todo.dto';
import { ResponseBuilder } from './utils/response-builder';

@Injectable()
export class GatewayService {
  private readonly logger = new Logger(GatewayService.name);

  constructor(
    @Inject('TODO_SERVICE') private readonly todoClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
    @Inject('NOTIFICATION_SERVICE') private readonly notificationClient: ClientProxy,
  ) {}

  // Create todo via TodoService and send notification via NotificationService
  async createTodo(data: CreateTodoDto) {
    try {
      // Send request to TodoService
      const todo = await firstValueFrom(this.todoClient.send({ cmd: 'createTodo' }, data));
      this.logger.log(` Todo created via Gateway: ${todo.data.title}`);

      // Send notification via NotificationService
      await this.notificationClient.emit('task.created', {
        type: 'email',
        recipient: data.userId,
        message: `New task created: ${todo.data.title}`,
      });

      return ResponseBuilder.success(todo.data, 'Todo created and notification sent');
    } catch (error) {
      this.logger.error('Error in createTodo', error.stack);
      throw new InternalServerErrorException('Error creating todo');
    }
  }

  // Create user via UserService
  async createUser(data: CreateUserDto) {
    try {
      const user = await firstValueFrom(this.userClient.send({ cmd: 'createUser' }, data));
      this.logger.log(`✅ User created via Gateway: ${user.data.email}`);
      return ResponseBuilder.success(user.data, 'User created successfully');
    } catch (error) {
      this.logger.error('Error in createUser', error.stack);
      throw new InternalServerErrorException('Error creating user');
    }
  
}
}