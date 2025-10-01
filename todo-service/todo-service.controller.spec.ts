import { Test, TestingModule } from '@nestjs/testing';
import { TodoServiceController } from './todo-service.controller';
import { TodoServiceService } from './todo-service.service';

describe('TodoServiceController', () => {
  let controller: TodoServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoServiceController],
      providers: [TodoServiceService],
    }).compile();

    controller = module.get<TodoServiceController>(TodoServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
