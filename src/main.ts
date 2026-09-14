import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

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
  
  // la parte para el swagger
  const config = new DocumentBuilder()
    .setTitle('Blog API')
    .setDescription('Blog API description')
    .setVersion('1.0')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory, {
    jsonDocumentUrl: 'swagger/json',
  });
  
  // Helmet añade cabeceras HTTP de seguridad a las respuestas.
  // Por ejemplo, indica al navegador que respete el tipo de contenido declarado.
  app.use(helmet());

  // CORS indica desde qué orígenes el navegador puede leer respuestas de esta API.
  // Un origen incluye protocolo, dominio y puerto, por ejemplo: http://localhost:5173.
  // Estas reglas no sustituyen la autenticación con JWT en las rutas protegidas.
  app.enableCors({
    // Para permitir solo tu frontend (React, Angular, etc.), usa su origen en lugar de '*':
    // origin: 'http://myblog.com',
    // '*' permite que el navegador lea las respuestas desde cualquier origen.
    origin: '*',
  });

  await app.listen(process.env.PORT ?? 3000);
}
await bootstrap();
