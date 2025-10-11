import { IResponse } from './response.interface';

import { CreateTodoDto } from '../../todo/dto/create-todo.dto';
import { UpdateTodoDto } from '../../todo/dto/update-todo.dto';
import { FilterTodoDto } from '../../todo/dto/filter-todo.dto';
import { TodoEntity } from '../../todo/entities/todo.entity';
import { IPaginationResult } from './pagination.interface';

export interface ITodo {
  create(createTodoDto: CreateTodoDto): Promise<IResponse<TodoEntity>>;
  findAll(filterDto?: FilterTodoDto): Promise<IResponse<IPaginationResult<TodoEntity>>>;
  findOne(id: string): Promise<IResponse<TodoEntity>>;
  update(id: string, updateTodoDto: UpdateTodoDto): Promise<IResponse<TodoEntity>>;
  delete(id: string): Promise<IResponse<null>>;
}