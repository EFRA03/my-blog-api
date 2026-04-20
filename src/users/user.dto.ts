import { Type } from 'class-transformer';
import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength, ValidateNested } from 'class-validator';

// DTO para crear un perfil, con validaciones
export class CreateProfileDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsOptional()
  avatar: string;
}
// DTO para crear un usuario, con validaciones
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // @ Decoradores de validacion: @IsEmail(), @IsNotEmpty(),etc
  @IsEmail()
  @IsNotEmpty()
  email: string;
  // Validación anidada para el perfil, usando @ValidateNested() y @Type() para transformar el objeto
  @ValidateNested()
  @Type(() => CreateProfileDto)
  @IsNotEmpty()
  profile: CreateProfileDto;
}
// DTO para actualizar un usuario, con campos opcionales
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @MinLength(8)
  password: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
