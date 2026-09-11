import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto.js';
import { UpdateCategoryDto } from '../dto/update-category.dto.js';
import { Category } from '../entities/category.entity.js';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  async create(body: CreateCategoryDto) {
    try {
      const newCategory = await this.categoriesRepository.save(body);
      return await this.findOne(newCategory.id);
    } catch {
      throw new BadRequestException('Error al crear la categoría');
    }
  }

  async findAll() {
    return await this.categoriesRepository.find();
  }

  async findOne(id: number) {
    const category = await this.categoriesRepository.findOne({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Categoría con el id ${id} no encontrada`);
    }

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    try {
      const category = await this.findOne(id);
      const updatedCategory = this.categoriesRepository.merge(
        category,
        updateCategoryDto,
      );
      return await this.categoriesRepository.save(updatedCategory);
    } catch {
      throw new BadRequestException('Error al actualizar la categoría');
    }
  }

  async remove(id: number) {
    try {
      await this.categoriesRepository.delete(id);
      return { mensaje: `La categoría con el ID ${id} fue eliminada` };
    } catch {
      throw new BadRequestException('Error al eliminar la categoría');
    }
  }
}
