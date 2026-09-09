import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto.js';
import { UpdatePostDto } from './dto/update-post.dto.js';
import { Post } from './entities/post.entity.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save(createPostDto);
      return newPost;
    } catch {
      throw new BadRequestException('Error al crear el post');
    }
  }

  async findAll(){
    const posts = await this.postsRepository.find();
    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({ 
      where: { id },
    });
    if (!post) {
      throw new NotFoundException(`Post con el id ${id} no encontrado`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    try {
      const post = await this.findOne(id);
      const updatedPost = this.postsRepository.merge(post, updatePostDto);
      const savedPost = await this.postsRepository.save(updatedPost);
      return savedPost;
    } catch {
      throw new BadRequestException('Error al actualizar el post');
    }
  }

  async remove(id: number) {
    try {
      await this.postsRepository.delete(id);
      return { mensaje: `El post con el ID ${id} fue eliminado` };
    } catch {
      throw new BadRequestException('Error al eliminar el post');
    }
  }
}
