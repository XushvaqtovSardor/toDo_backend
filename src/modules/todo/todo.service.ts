import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto, FindDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TodoService {
  constructor(private prisma: PrismaService) { }
  async create(createTodoDto: CreateTodoDto) {
    const task = await this.prisma.task.create({ data: { text: createTodoDto.text } })
    return task
  }

  async findAll(query: FindDto) {
    const { status, search } = query
    let statustask;
    if (status == 'active') {
      statustask = false
    } else if (status == 'completed') {
      statustask = true
    } else {
      statustask = undefined
    }
    const task = await this.prisma.task.findMany({
      where: {
        completed: statustask,
        text: search ? { startsWith: search } : undefined,
      },
      orderBy: { createdAt: 'desc' }
    })
    return task

  }
  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const task = await this.prisma.task.findFirst({ where: { id } })
    if (!task) throw new NotFoundException(`Task with ${id} not found`)
    if(updateTodoDto.completed==undefined && updateTodoDto.text==undefined) throw new BadRequestException
    const updatedTask = await this.prisma.task.update({
      where: { id },
      data: {
        ...updateTodoDto
      }
    })
    return updatedTask
  }

  async updateAllComplated() {
    const reult = await this.prisma.task.updateMany(
      {
        data: { completed: true }
      }
    )
    return {
      message: 'All tasks compeleted',
      updateCount: reult.count
    }
  }
  deleteAll(){
    return this.prisma.task.deleteMany()
  }
  async remove(id: number) {
    const task=await this.prisma.task.delete({where:{id}})
    return {
      message:`Task with ${task.id} successfully deleted `
    }
  }
  async deleteCompleted(){
    const task=await this.prisma.task.deleteMany({where:{completed:true}})
    if(!task) throw new NotFoundException('compeleted tasks doesnt exists')
  } 

}
