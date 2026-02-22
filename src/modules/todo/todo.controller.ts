import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseIntPipe } from '@nestjs/common';
import { TodoService } from './todo.service';
import { CreateTodoDto, FindDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { TodoResponse, TodoResponseDto } from './entities/todo.entity';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) { }

  @Post()
  @ApiResponse({
    status: 200,
    description: 'Task created',
    type: TodoResponse
  })
  @ApiBadRequestResponse({
    description: 'malumotlar kiritishda xatolik'
  })
  create(@Body() createTodoDto: CreateTodoDto) {
    return this.todoService.create(createTodoDto);
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'tasks',
    type: [TodoResponseDto]
  })
  @ApiInternalServerErrorResponse({ description: 'malumotlar olib kelishda xatolik' })
  findAll(@Query() query: FindDto) {
    return this.todoService.findAll(query);
  }

  @Patch('completedAll')
  @ApiResponse({
    status: 200,
    description: 'All tasks compeleted'
  })
  complatedAll() {
    return this.todoService.updateAllComplated()
  }


  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'task completed',
    type: TodoResponseDto
  })
  @ApiBadRequestResponse({ description: 'invalid increditails' })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateTodoDto: UpdateTodoDto) {
    return this.todoService.update(+id, updateTodoDto);
  }

  @Delete('deleteCompleted')
  @ApiResponse({
    status:200,
    description:'completed tasks deleted'
  })
  @ApiInternalServerErrorResponse({description:'problem with deleting completed tasks'})
  deleteCompleted(){
    return this.todoService.deleteCompleted()
  }

  @Delete('deleteAllTask')
  @ApiResponse({
    status:200,
    description:'All tasks successfully deleted'
  })
  @ApiInternalServerErrorResponse({ description: 'malumotlar olishda xatolik' })
  deleteAll() {
    return this.todoService.deleteAll()
  }



  @Delete(':id')
  @ApiResponse({
    status: 200,
    description: 'Task with 3 successfully deleted'
  })
  @ApiInternalServerErrorResponse({ description: 'malumotlar olishda xatolik' })
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}
