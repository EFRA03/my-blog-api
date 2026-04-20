import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

// DTO para crear un perfil, con validaciones
export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  avatar: string;
}

// DTO para actualizar un perfil, con campos opcionales (Se podria ver asi pero con PartialType
// de @nestjs/mapped-types seria mas facil)
/*
export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsString()
  @IsOptional()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
*/
// Usando PartialType para crear el DTO de actualización a partir del DTO de creación,
// haciendo todos los campos opcionales
export class UpdateProfileDto extends PartialType(CreateProfileDto) {}
