import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableShutdownHooks(); // Habilitar el hot reload

  dotenv.config();
  const config = new DocumentBuilder()
    .setTitle('Fixtrack API')
    .setVersion('1.0')
    .addTag('My API tag')
    .build();

  app.enableCors({
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    origin: 'http://localhost:4200',
    allowedHeaders: [
      'Content-Type',
      'Content-Length',
      'Accept-Language',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers'
    ],
    exposedHeaders: [
      'Content-Length',
      'Content-Type',
      'Accept-Language',
      'Access-Control-Allow-Origin',
      'Access-Control-Allow-Methods',
      'Access-Control-Allow-Headers'
    ]
  });

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, document);

  const port = process.env.PORT || 3333;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
  Logger.log(
    `📖 Swagger API documentation is running on: http://localhost:${port}/${globalPrefix}/docs`
  );
}

bootstrap();
