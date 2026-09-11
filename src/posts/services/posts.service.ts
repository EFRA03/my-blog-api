import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from './../dto/create-post.dto.js';
import { UpdatePostDto } from './../dto/update-post.dto.js';
import { Post } from './../entities/post.entity.js';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
  ) {}

  async create(body: CreatePostDto) {
    try {
      const newPost = await this.postsRepository.save({
        ...body,
        user: { id: body.userId },
        categories: body.categoryIds?.map((id) => ({ id })),
      });
      return this.findOne(newPost.id);
    } catch {
      throw new BadRequestException('Error creating post');
    }
  }


  async findAll() {
    const posts = await this.postsRepository.find({
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });

    return posts;
  }

  async findOne(id: number) {
    const post = await this.postsRepository.findOne({
      where: { id },
      relations: {
        user: {
          profile: true,
        },
        categories: true,
      },
    });

    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
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
