import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TodoServiceService } from './todo-service.service';
import { CreateTodoServiceDto } from './dto/create-todo-service.dto';
import { UpdateTodoServiceDto } from './dto/update-todo-service.dto';

@Controller()
export class TodoServiceController {
  constructor(private readonly todoServiceService: TodoServiceService) {}

  @MessagePattern('createTodoService')
  create(@Payload() createTodoServiceDto: CreateTodoServiceDto) {
    return this.todoServiceService.create(createTodoServiceDto);
  }

  @MessagePattern('findAllTodoService')
  findAll() {
    return this.todoServiceService.findAll();
  }

  @MessagePattern('findOneTodoService')
  findOne(@Payload() id: number) {
    return this.todoServiceService.findOne(id);
  }

  @MessagePattern('updateTodoService')
  update(@Payload() updateTodoServiceDto: UpdateTodoServiceDto) {
    return this.todoServiceService.update(updateTodoServiceDto.id, updateTodoServiceDto);
  }

  @MessagePattern('removeTodoService')
  remove(@Payload() id: number) {
    return this.todoServiceService.remove(id);
  }
}
