import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  UseFilters,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiParam } from '@nestjs/swagger';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { ResponseBuilder } from '../common/utils/response-builder';
import { TodoService } from './todo-service.service';
import { IPaginationResult } from '../common/interface/pagination.interface';
import { ITodo } from '../common/interface/todo.interface';



@ApiTags('Todo Management')
@Controller('todos')
@UseFilters(AllExceptionsFilter)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new Todo item' })
  @ApiResponse({ status: 201, description: 'Todo created successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async create(@Body() createTodoDto: CreateTodoDto) {
    const todo = await this.todoService.create(createTodoDto);
    return ResponseBuilder.success('Todo created successfully', todo, { status: HttpStatus.CREATED });
  }

  @Get()
  @ApiOperation({ summary: 'Get all Todo items with pagination' })
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiResponse({ status: 200, description: 'List of Todos' })
  async findAll(@Query() query: IPaginationResult<ITodo>) {
    const todos = await this.todoService.findAll(query);
    return ResponseBuilder.success('Fetched all todos', todos);
  }


  @Get(':id')
  @ApiOperation({ summary: 'Get Todo by ID' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Todo details' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async findOne(@Param('id') id: string) {
    const todo = await this.todoService.findOne(id);
    return ResponseBuilder.success('Fetched todo successfully', todo);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing Todo' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Todo updated successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto) {
    const updated = await this.todoService.update(id, updateTodoDto);
    return ResponseBuilder.success('Todo updated successfully', updated);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Delete a Todo by ID' })
  @ApiParam({ name: 'id', required: true, type: String })
  @ApiResponse({ status: 200, description: 'Todo deleted successfully' })
  @ApiResponse({ status: 404, description: 'Todo not found' })
  async delete(@Param('id') id: string) {
    await this.todoService.delete(id);
    return ResponseBuilder.success('Todo deleted successfully', null);
  }
}
