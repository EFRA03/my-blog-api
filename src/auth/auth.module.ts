import { Module } from '@nestjs/common';
// Servicio que maneja la lógica de autenticación (validar credenciales, devolver usuario)
import { AuthService } from './services/auth.service.js';

import { JwtModule} from '@nestjs/jwt';

import { PassportModule } from '@nestjs/passport';
// Estrategia local de Passport (usuario/contraseña) integrada con NestJS
import { LocalStrategy } from './strategies/local.strategy.js';
// Módulo de usuarios, necesario para consultar datos de la base de usuarios
import { UsersModule } from './../users/users.module.js';
import { AuthController } from './controller/auth.controller.js';
import { sign } from 'crypto';
import { ConfigService } from '@nestjs/config';
import type { Env } from '../config/env.model.js';

@Module({
  // imports: módulos externos que este módulo necesita
  imports: [
    UsersModule,     // acceso al servicio de usuarios
    PassportModule,  // integración con PassportJS
    // Configura JWT con la clave definida en las variables de entorno.
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => ({
        // El nombre debe coincidir con JWT_SECRET en .env; getOrThrow() avisa si falta.
        secret: configService.getOrThrow('JWT_SECRET', { infer: true }),
        // signOptions se escribe con 's' minúscula y configura la expiración del token.
        signOptions: { expiresIn: '6d'},
      }),
    }),
    /*
    para pruebas
    // Configura el JwtService que usa AuthService para generar tokens JWT.
    JwtModule.register({
      // Clave secreta utilizada para firmar los tokens y verificar su firma.
      secret: 'my-secret-key',
      // Los tokens expiran 6 días después de su creación: 'd' significa días.
      signOptions: { expiresIn: '6d'},
    }),
    */
  ],
  // providers: servicios y estrategias que este módulo expone
  providers: [
    AuthService,     // lógica de autenticación
    LocalStrategy,   // estrategia local de login
  ],
  controllers: [AuthController],
})
export class AuthModule {}
