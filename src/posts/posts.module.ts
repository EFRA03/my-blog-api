import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service.js';
import { PostsController } from './controllers/posts.controller.js';
import { CategoriesController } from './controllers/categories.controller.js';
import { CategoriesService } from './services/categories.service.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './entities/post.entity.js';
import { Category } from './entities/category.entity.js';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category])],
  controllers: [PostsController, CategoriesController],
  providers: [PostsService, CategoriesService],
  exports: [PostsService, CategoriesService],
})
export class PostsModule {}
