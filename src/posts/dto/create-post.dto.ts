import {
    IsArray,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreatePostDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'El título de la publicación' })
    title: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'El contenido de la publicación' })
    content?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'La URL o ruta de la imagen de portada de la publicación' })
    coverImage?: string;

    @IsString()
    @IsOptional()
    @ApiPropertyOptional({ description: 'El resumen de la publicación' })
    summary?: string;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Los IDs de las categorías asociadas a la publicación',
        type: [Number],
    })
    categoryIds?: number[];
}
