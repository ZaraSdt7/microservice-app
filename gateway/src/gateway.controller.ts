import { Controller, Post, Body } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateTodoDto } from '../../todo-service/src/todo/dto/create-todo.dto';
import { CreateUserDto } from '../../user-service/src/user/dto/create-user.dto';

@ApiTags('gateway')
@Controller()
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @Post('todos')
  @ApiOperation({ summary: 'Create a new Todo and notify user' })
  @ApiResponse({ status: 201, description: 'Todo created and notification sent' })
  async createTodo(@Body() body: CreateTodoDto) {
    return this.gatewayService.createTodo(body);
  }

  @Post('users')
  @ApiOperation({ summary: 'Create a new User' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  /**
   * Creates a new Todo via TodoService and sends notification via NotificationService.
   * @param body CreateTodoDto containing title, description, and userId
   * @returns Promise with created Todo and notification response
   */
  async createUser(@Body() body: CreateUserDto) {
    return this.gatewayService.createUser(body);
  }
}
