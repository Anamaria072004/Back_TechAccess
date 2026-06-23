// main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Set global prefix
  app.setGlobalPrefix('api');

  //CORS 
  app.enableCors({
    //Angular permite todo (*)
    origin: process.env.FRONTEND_URL ?? '*', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  //Pipes globales de validación
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API')
    .setDescription('The haptica API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  //Puerto dinámico para Render
  const port = process.env.PORT ?? 3000;
  await app.listen(port, '0.0.0.0');
  
  // Logs limpios para producción
  console.log(`🚀 Application running on port: ${port}`);
}
bootstrap();