import { Injectable } from '@nestjs/common';
import { CreateTodoServiceDto } from './dto/create-todo-service.dto';
import { UpdateTodoServiceDto } from './dto/update-todo-service.dto';

@Injectable()
export class TodoServiceService {
  create(createTodoServiceDto: CreateTodoServiceDto) {
    return 'This action adds a new todoService';
  }

  findAll() {
    return `This action returns all todoService`;
  }

  findOne(id: number) {
    return `This action returns a #${id} todoService`;
  }

  update(id: number, updateTodoServiceDto: UpdateTodoServiceDto) {
    return `This action updates a #${id} todoService`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoService`;
  }
}
