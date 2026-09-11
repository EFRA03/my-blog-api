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
    const users = await this.usersRepository.find({
      relations: {
        profile: true,
      },
    });
    return users;
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });

    if (!user) {
      throw new NotFoundException(
        `Usuario con el id ${id} no encontrado`,
      );
    }
    return user;
  }

  async getPostsByUserId(id: number) {
    const user = await this.usersRepository.findOne({
      where: { id },
      relations: {
        posts: true,
        profile: true,
      },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user.posts;
  }

  async getProfileByUserId(id: number) {
    const user = await this.findOne(id);
    return user.profile;
  }

  async create(body: CreateUserDto) {
    try {
      const newUser = this.usersRepository.create(body); // se ejecuta con el .create y sirve para los hooks
      const savedUser = await this.usersRepository.save(newUser);
      return this.findOne(savedUser.id);
    } catch {
      throw new BadRequestException('Error al crear el usuario');
    }
  }

  async update(id: number, changes: UpdateUserDto) {
    try {
      const user = await this.findOne(id);
      const updatedUser = this.usersRepository.merge(user, changes);
      const savedUser = await this.usersRepository.save(updatedUser);
      return savedUser;
    } catch {
      throw new BadRequestException('Error al actualizar el usuario');
    }
    
  }

  async delete(id: number) {
    try {
      await this.usersRepository.delete(id);
        return {
          mensaje: `El usuario con el ID ${id} fue eliminado`
        };
    } catch {
      throw new BadRequestException('Error al eliminar el usuario');
    }
    
  }

}
