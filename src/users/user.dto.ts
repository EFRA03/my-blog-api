import { IsString, IsEmail, IsNotEmpty, IsOptional, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  // @ Decoradores de validacion: @IsEmail(), @IsNotEmpty(),etc
  @IsEmail()
  @IsNotEmpty()
  email: string;
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
