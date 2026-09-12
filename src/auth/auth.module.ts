import { Module } from '@nestjs/common';
// Servicio que maneja la lógica de autenticación (validar credenciales, devolver usuario)
import { AuthService } from './services/auth.service.js';

import { PassportModule } from '@nestjs/passport';
// Estrategia local de Passport (usuario/contraseña) integrada con NestJS
import { LocalStrategy } from './strategies/local.strategy.js';
// Módulo de usuarios, necesario para consultar datos de la base de usuarios
import { UsersModule } from './../users/users.module.js';

@Module({
  // imports: módulos externos que este módulo necesita
  imports: [
    UsersModule,     // acceso al servicio de usuarios
    PassportModule,  // integración con PassportJS
  ],
  // providers: servicios y estrategias que este módulo expone
  providers: [
    AuthService,     // lógica de autenticación
    LocalStrategy,   // estrategia local de login
  ],
})
export class AuthModule {}
