import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { TodoModule } from './modules/todo/todo.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [TodoModule,PrismaModule],
  controllers: [],
  providers: [AppService],
})
export class AppModule {}
