import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config=new DocumentBuilder()
  .setTitle('TO DO')
  .setDescription('backed to do')
  .setVersion('1.0')
  .build()
  const ducument=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('swagger',app,ducument)

  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
}
bootstrap();
