import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
  // Importamos UsersController para que pueda manejar las rutas 
  // relacionadas con los usuarios
  controllers: [UsersController],
  // Importamos UsersService para que pueda ser inyectado en 
  // UsersController y otros componentes que lo necesiten
  providers: [UsersService],
  // Exportamos UsersService para que pueda ser utilizado en otros 
  // módulos, como AppModule, permitiendo que los controladores de 
  // otros módulos puedan acceder a la lógica de negocio de 
  // UsersService.
  exports: [UsersService], 
})
export class UsersModule {}
