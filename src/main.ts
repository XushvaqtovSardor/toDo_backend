import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   app.enableCors({
    origin: '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )


  const config=new DocumentBuilder()
  .setTitle('TO DO')
  .setDescription('backed to do')
  .setVersion('1.0')
  .build()
  const ducument=SwaggerModule.createDocument(app,config)
  SwaggerModule.setup('swagger',app,ducument)
  await app.listen(process.env.PORT ?? 3000,'0.0.0.0');
  console.log('http://localhost:3000/swagger')
}
bootstrap();
