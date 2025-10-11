import { Injectable, Logger, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TodoEntity } from './entities/todo.entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { FilterTodoDto } from './dto/filter-todo.dto';
import { ITodo } from '../common/interface/todo.interface';
import { IPaginationResult } from '../common/interface/pagination.interface';
import { ResponseBuilder } from '../common/utils/response-builder';

import { MESSAGE_CONSTANTS } from '../common/filters/constants';
import { IResponse } from '../common/interface/response.interface';

@Injectable()
export class TodoService implements ITodo {
  private readonly logger = new Logger(TodoService.name);

  constructor(
    @InjectRepository(TodoEntity)
    private readonly todoRepo: Repository<TodoEntity>,
  ) {}
 

  async create(dto: CreateTodoDto): Promise<IResponse<TodoEntity>> {
    try {
      const todo = this.todoRepo.create(dto);
      const saved = await this.todoRepo.save(todo);
      this.logger.log(`✅ Created Todo: ${saved.title}`);
      return ResponseBuilder.success(saved, MESSAGE_CONSTANTS.TODO_CREATED);
    } catch (error) {
      this.logger.error('Error creating Todo', error.stack);
      throw new InternalServerErrorException('Error creating Todo');
    }
  }

  async findAll(filter?: FilterTodoDto): Promise<IResponse<IPaginationResult<TodoEntity>>> {
    try {
      const { search, isCompleted, page = 1, limit = 10 } = filter;
      const query = this.todoRepo.createQueryBuilder('todo');

      if (search) {
        query.andWhere('(todo.title ILIKE :search OR todo.description ILIKE :search)', {
          search: `%${search}%`,
        });
      }

      if (typeof isCompleted === 'boolean') {
        query.andWhere('todo.isCompleted = :isCompleted', { isCompleted });
      }

      query.skip((page - 1) * limit).take(limit);

      const [result, total] = await query.getManyAndCount();

      const pagination: IPaginationResult<TodoEntity> = {
        data: result,
        total,
        page,
        limit,
      };

      return ResponseBuilder.success(pagination, 'Todos fetched successfully');
    } catch (error) {
      this.logger.error('Error fetching Todos', error.stack);
      throw new InternalServerErrorException('Error fetching Todos');
    }
  }

  async findOne(id: string): Promise<IResponse<TodoEntity>> {
    try {
      const todo = await this.todoRepo.findOne({ where: { id } });
      if (!todo) throw new NotFoundException(MESSAGE_CONSTANTS.TODO_NOT_FOUND);
      return ResponseBuilder.success(todo, 'Todo found');
    } catch (error) {
      this.logger.error(` Error fetching Todo ${id}`, error.stack);
      throw new InternalServerErrorException('Error fetching Todo');
    }
  }

  async update(id: string, dto: UpdateTodoDto): Promise<IResponse<TodoEntity>> {
    try {
      const todo = await this.todoRepo.preload({ id, ...(dto as unknown as Partial<TodoEntity>) });
      if (!todo) throw new NotFoundException(MESSAGE_CONSTANTS.TODO_NOT_FOUND);

      const updated = await this.todoRepo.save(todo);
      this.logger.log(`Updated Todo: ${updated.id}`);
      return ResponseBuilder.success(updated, MESSAGE_CONSTANTS.TODO_UPDATED);
    } catch (error) {
      this.logger.error(`Error updating Todo ${id}`, error.stack);
      throw new InternalServerErrorException('Error updating Todo');
    }
  }

  async delete(id: string): Promise<IResponse<null>> {
    try {
      const todo = await this.todoRepo.findOne({ where: { id } });
      if (!todo) throw new NotFoundException(MESSAGE_CONSTANTS.TODO_NOT_FOUND);

      await this.todoRepo.remove(todo);
      this.logger.warn(` Deleted Todo: ${id}`);
      return ResponseBuilder.success(null, MESSAGE_CONSTANTS.TODO_DELETED);
    } catch (error) {
      this.logger.error(`Error deleting Todo ${id}`, error.stack);
      throw new InternalServerErrorException('Error deleting Todo');
    }
  }
}
