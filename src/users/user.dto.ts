import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  // @ Decoradores de validacion: @IsEmail(), @IsNotEmpty(),etc
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
// DTO para actualizar un usuario, con campos opcionales
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;
}
