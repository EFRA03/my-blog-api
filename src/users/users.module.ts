import { Module } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { UsersController } from './users.controller.js';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  // Exportamos UsersService para que pueda ser utilizado en otros 
  // módulos, como AppModule, permitiendo que los controladores de 
  // otros módulos puedan acceder a la lógica de negocio de 
  // UsersService.
  exports: [UsersService], 
})
export class UsersModule {}
