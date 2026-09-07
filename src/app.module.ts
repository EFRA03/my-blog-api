import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';

@Module({
  imports: [
    // Estamos importando el modulo de configuracion para poder 
    // usar variables de entorno en toda la aplicacion
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
