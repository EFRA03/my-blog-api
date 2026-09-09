import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength, ValidateNested } from 'class-validator';
import { CreateProfileDto } from './update-profile.dto.js';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(8, { message: 'La contraseña debe tener al menos 8 caracteres' })
  password: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty()
  email: string;

  @ValidateNested()
  @Type(() => CreateProfileDto )
  @IsNotEmpty()
  profile: CreateProfileDto;
}


