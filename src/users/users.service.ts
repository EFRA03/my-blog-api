import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {

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
  
// Lo trajimos la logica desde controller a service 
// para mantener la logica de negocio en un solo lugar
//  y el controller solo se encargue de recibir las 
// peticiones y enviar las respuestas
  create(body: CreateUserDto): User {
    const newUser: User = {
      id: Date.now().toString(),// Genera un ID único basado en la fecha y hora actual
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

// Lo trajimos de controller para obtener la lista de 
// usuarios desde el service y no desde el controller
  findAll() {
    return this.users;
  }

// Aqui estamos implementando la logica de negocio 
// para buscar un usuario por su id  
  findOne(id: string): User {
    const { user } = this.buscarUsuarioOError(id);
    // Estamos restringiendo el acceso a un usuario con id 1, 
    // lanzando una excepcion
    if (user.id === '1') {
      throw new ForbiddenException(
        `El usuario con id ${id} no puede ser procesado`,
      );
    }
    return user;
  }

// Aqui estamos actualizando un usuario por su id, 
// si no lo encuentra lanza una excepcion  
  update(id: string, updateUserDto: UpdateUserDto): User {
    const {user, position} = this.buscarUsuarioOError(id);
    const updatedUser: User = {
      ...user,
      ...updateUserDto,
    };
    this.users[position] = updatedUser;
    return updatedUser;
  }

// Aqui estamos eliminando un usuario por su id,
// si no lo encuentra lanza una excepcion  
  remove(id: string): { message: string } {
    const { position } = this.buscarUsuarioOError(id);

    this.users.splice(position, 1);

    return {
      message: 'Usuario eliminado correctamente',
    };
  }

// Método reutilizable para buscar usuario y posición
  private buscarUsuarioOError(id: string): {
    user: User;
    position: number;
  } {
    const position = this.users.findIndex(
      (currentUser) => currentUser.id === id,
    );

    if (position === -1) {
      throw new NotFoundException(
        `Usuario con el id ${id} no encontrado`,
      );
    }

    return {
      user: this.users[position],
      position,
    };
  }
}
