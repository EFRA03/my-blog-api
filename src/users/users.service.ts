import { Injectable, NotFoundException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { CreateUserDto,  } from './dto/create-user.dto.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import { User } from './entities/user.entity.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/browser/repository/Repository.js';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });
    // Para mensaje de error con id no encontrado
    if (!user) {
      throw new NotFoundException(
        `Usuario con el id ${id} no encontrado`,
      );
    }

    // Conserva esto únicamente si es parte de tu ejercicio
    if (user.id === 1) {
      throw new ForbiddenException(
        `El usuario con id ${id} no puede ser procesado`,
      );
    }

    return user;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.save(body);
      return newUser;
    } catch {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    const user = await this.findOne(id);
    const updatedUser = this.usersRepository.merge({
      ...user,
      ...changes,
    })
    return this.usersRepository.save(updatedUser);
  }

  async delete(id: number) {
    const user = await this.findOne(id);
    await this.usersRepository.delete(user.id);
    return {
      mensaje: `El usuario con el ID ${id} fue eliminado`
    };
  }

}
