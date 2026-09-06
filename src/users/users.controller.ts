import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service.js';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
/**
 * Obtiene todos los usuarios registrados.
 * Método GET /users
 * Retorna un arreglo de usuarios desde el servicio.
 */
@Get()
  findAll() {
    return this.usersService.findAll();
  }

  /**
 * Obtiene un usuario por su ID.
 * Método GET /users/:id
 * @param id Identificador del usuario
 * @returns Usuario encontrado o excepción si no existe
 */
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

/**
 * Crea un nuevo usuario.
 * Método POST /users
 * @param createUserDto Datos del nuevo usuario
 * @returns Usuario creado
 */
@Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  /**
 * Elimina un usuario por su ID.
 * Método DELETE /users/:id
 * @param id Identificador del usuario
 * @returns Mensaje de confirmación o excepción si no existe
 */
@Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  /**
 * Actualiza parcialmente un usuario.
 * Método PATCH /users/:id
 * @param id Identificador del usuario
 * @param updateUserDto Datos a actualizar
 * @returns Usuario actualizado
 */
@Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.update(id, updateUserDto);
  }
}
