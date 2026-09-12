import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,            // Elimina automáticamente propiedades que no estén en el DTO
      forbidNonWhitelisted: true, // Lanza error si llegan propiedades no permitidas
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      }
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
