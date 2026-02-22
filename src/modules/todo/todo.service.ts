import { Injectable } from '@nestjs/common';
import { CreateTodoDto, FindDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { startWith } from 'rxjs';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) { }
  create(createTodoDto: CreateTodoDto) {
    const task = this.prisma.task.create({ data: { text: createTodoDto.text } })
    return task
  }

  findAll(query: FindDto) {
    const { status, search } = query
    let statustask;
    if (status == 'active') {
      statustask = false
    } else if (status == 'completed') {
      statustask = true
    } else {
      statustask = undefined
    }
    const filter = {
      text: search ? { startsWith: search } : undefined,
      completed: statustask
    }
    return this.prisma.task.findMany()
  }

  findOne(id: number) {
    return `This action returns a #${id} todo`;
  }

  update(id: number, updateTodoDto: UpdateTodoDto) {
    return `This action updates a #${id} todo`;
  }

  remove(id: number) {
    return `This action removes a #${id} todo`;
  }
}
