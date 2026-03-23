import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from './user.model';
import { CreateUserDto, UpdateUserDto } from './user.dto';
// Inyectamos el servicio de usuarios en el controlador para
// manejar la lógica de negocio relacionada con los usuarios
@Injectable()
export class UsersService {
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

  findAll() {
    return this.users;
  }
  // Método para manejar la solicitud GET que obtiene un usuario por su id
  getUserById(id: string) {
    const position = this.findOne(id);
    const user = this.users[position];
    if (user.id === '1') {
      throw new ForbiddenException(`No tienes permiso para acceder a este usuario`);
    }
    return user;
  }

  create(body: CreateUserDto) {
    const newId = Math.max(...this.users.map((u) => parseInt(u.id))) + 1;
    const user = {
      id: newId.toString(),
      ...body,
    };
    this.users.push(user);
    return user;
  }

  update(id: string, changes: UpdateUserDto) {
    const position = this.findOne(id);
    const currentData = this.users[position];
    const updatedUser = {
      ...currentData,
      ...changes,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

  delete(id: string) {
    const position = this.findOne(id);
    this.users.splice(position, 1);
    return {
      message: `Usuario con id ${id} eliminado`,
    };
  }
  // Método privado para encontrar la posición de un usuario por su id
  private findOne(id: string) {
    const position = this.users.findIndex((user) => user.id === id);
    if (position === -1) {
      throw new NotFoundException(`Usuario con id ${id} no encontrado`);
    }
    return position;
  }
}
