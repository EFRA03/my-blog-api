import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entitites/user.entity';

// Servicio para manejar la lógica de usuarios, incluyendo operaciones CRUD y validaciones
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  // Método para obtener todos los usuarios
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }
  // Método para obtener un usuario por ID, con validación de acceso
  async getUserById(id: number) {
    const user = await this.findOne(id);
    if (user.id === 1) {
      throw new ForbiddenException(`No tienes permiso para acceder a este usuario`);
    }
    return user;
  }
  // Método para crear un nuevo usuario, con manejo de excepciones para casos como email duplicado
  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException(`No se pudo crear el usuario, email ya existe`);
    }
  }
  // Método para actualizar un usuario existente, con validación de existencia y manejo de cambios
  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge(user, changes);
    return this.usersRepository.save(updatedUser);
  }
  // Método para eliminar un usuario, con validación de existencia y manejo de eliminación
  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return {
      message: `Usuario con id ${id} eliminado`,
    };
  }
  // Método privado para encontrar un usuario por ID, lanzando una excepción si no se encuentra
  private async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }
}
