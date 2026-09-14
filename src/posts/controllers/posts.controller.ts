import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

import { PostsService } from './../services/posts.service.js';
import { CreatePostDto } from './../dto/create-post.dto.js';
import { UpdatePostDto } from './../dto/update-post.dto.js';
import { Payload } from '../../auth/models/payload.model.js';
import { Post as PostEntity } from '../entities/post.entity.js';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({ summary: 'Crea una nueva publicacion' })
  @ApiResponse({ status: 201, description: 'La publicación creada correctamente' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const payload = req.user as Payload;
    const userId = payload.sub;
    return this.postsService.create(createPostDto, userId);
  }

  @ApiOperation({ summary: 'Obtiene todas las publicaciones' })
  @ApiResponse({ status: 200, description: 'La lista de publicaciones', type: PostEntity })
  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @ApiOperation({ summary: 'Obtiene una publicación por su ID' })
  @ApiResponse({ status: 200, description: 'La publicación correspondiente al ID indicado' })
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.findOne(id);
  }

  @ApiOperation({ summary: 'Actualiza parcialmente una publicación por su ID' })
  @ApiResponse({ status: 200, description: 'La publicación actualizada' })
  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @ApiOperation({ summary: 'Elimina una publicación por su ID' })
  @ApiResponse({ status: 200, description: 'El mensaje de confirmación de la eliminación de la publicación' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.postsService.remove(id);
  }
}
