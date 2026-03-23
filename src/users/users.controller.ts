import { Controller, Get, Param, Post, Body, Delete, Put, NotFoundException, UnprocessableEntityException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './user.dto';

/*
Como estamos con typescript, es buena práctica definir
una interfaz para los objetos que vamos a manejar,
en este caso, los usuarios. Esto nos ayuda a tener un
código más claro y a evitar errores de tipo.
*/
interface User {
  id: string;
  name: string;
  email: string;
}

@Controller('users')
export class UsersController {
  // Endpoint para obtener todos los usuarios
  // Lista de usuarios simulados (base de datos falsa)
  private users: User[] = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
    },
    {
      id: '3',
      name: 'Alice Johnson',
      email: 'alice.johnson@example.com',
    },
  ];

  // Método para manejar la solicitud GET /users
  // http://localhost:3000/users
  @Get()
  getUsers() {
    return this.users;
  }
  // Método para manejar la solicitud GET /users/:id
  // http://localhost:3000/users/1
  /*
  @Get(':id')
  findUser(@Param('id') id: string) {
    return this.users.find((user) => user.id === id);
  }
  */
  /*
 // Para manejar el caso en el que no se encuentra un usuario con
 // el id proporcionado, podemos lanzar una excepción NotFoundException.
 //  Esto hará que el servidor responda con un código de estado 404 y
 // un mensaje de error adecuado.
 */
  @Get(':id')
  findUser(@Param('id') id: string) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      // (404) lanzamos una excepción NotFoundException si no se
      // encuentra el usuario
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    // Consultamos que el id no tiene permisos para acceder a ese usuario, en este caso el id '1'
    if (user.id === '1') {
      // (403) Si el usuario tiene id '1', lanzamos una excepción ForbiddenException
      throw new ForbiddenException(`No tienes permiso para acceder a este usuario`);
    }
    return user;
  }
  /*
  // Método para manejar la solicitud POST /users
  @Post()
  createUser(@Body() body: User) {
    this.users.push(body);
    return body;
  }
  */
  // Metodo que hace lo anterior pero asigna un id único al nuevo
  // usuario basado en el id más alto existente.
  /*
  @Post()
  createUser(@Body() user: User) {
    const newId = Math.max(...this.users.map((u) => parseInt(u.id))) + 1;
    user.id = newId.toString();
    this.users.push(user);
    return user;
  }*/

  // Método para manejar la solicitud POST /users con DTO
  /*
  @Post()
  createUser(@Body() body: CreateUserDto) {
    const newUser = {
      ...body,
      id: `${new Date().getTime()}`,
    };
    this.users.push(newUser);
    return newUser;
  }*/

  @Post()
  createUser(@Body() userDto: CreateUserDto) {
    const newId = Math.max(...this.users.map((u) => parseInt(u.id))) + 1;
    const user = {
      id: newId.toString(),
      ...userDto,
    };
    this.users.push(user);
    return user;
  }

  /*
  // Método para manejar la solicitud DELETE /users/:id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: `Usuario con id ${id} eliminado`,
    };
  }
  */
  // Este metodo hace lo mismo que el anterior pero maneja el caso
  // en el que no se encuentra un usuario con el id proporcionado.
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      // (404)Si no se encuentra el usuario, lanzamos una excepción NotFoundException
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    this.users = this.users.filter((user) => user.id !== id);
    return {
      message: `Usuario con id ${id} eliminado`,
    };
  }

  // Método para manejar la solicitud PUT /users/:id
  // Este método actualiza un usuario existente con los
  // cambios proporcionados
  @Put(':id')
  updateUser(@Param('id') id: string, @Body() changes: User) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      // (404)Si no se encuentra el usuario, lanzamos una excepción NotFoundException
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    const currentData = this.users[position];
    // validar que el email tenga un formato correcto (contenga '@')
    const email = changes?.email;
    if (email && !email.includes('@')) {
      // (422)Si el email no es válido, lanzamos una excepción UnprocessableEntityException
      throw new UnprocessableEntityException(`El email proporcionado no es válido`);
    }
    const updatedUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }
}
