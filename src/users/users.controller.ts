import { Controller, Get, Param, NotFoundException } from '@nestjs/common';
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
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return user;
  }
}
