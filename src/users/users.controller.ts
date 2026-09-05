import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';

/*Definimos la interfaz User para representar la estructura de un 
usuario*/
interface User {
  id: string;
  name: string;
  email: string;
}

// Definimos el controlador de usuarios con la ruta base 'users'
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

// Definimos un arreglo de usuarios de ejemplo
  private users: User[] = [
    {
      id: '1',
      name: 'Mariana Lopez',
      email: 'mariana.lopez@example.com',
    },
    {
      id: '2',
      name: 'Juan Perez',
      email: 'juan.perez@example.com',
    },
    {
      id: '3',
      name: 'Nicolas Lopez',
      email: 'nicolas.lopez@example.com',
    },
  ];
// Endpoint para obtener la lista de usuarios
  @Get()
  getUsers() {
    return this.users;
  }
// Endpoint para obtener un usuario por su ID
  @Get(':id')
  // @Param es un decorador que nos permite acceder a los parámetros de la ruta, en este caso el ID del usuario
  findUser(@Param('id') id: string) {
    return this.users.find((user) => user.id === id);
  }

// ===================================================
// grupo de endpoints para la gestión de usuarios utilizando el servicio UsersService
// ===================================================
/*
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
  */
}
