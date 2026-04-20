import { Type } from 'class-transformer';
import { PartialType, OmitType } from '@nestjs/mapped-types';
import { IsString, IsEmail, IsNotEmpty, MinLength, ValidateNested, IsOptional } from 'class-validator';
import { CreateProfileDto, UpdateProfileDto } from './profile.dto';

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
// Se puede usar OmitType para crear un DTO que omita el campo 'profile'
// si no se quiere incluir en ciertas operaciones
/*
export class CreateUserWithoutProfile extends OmitType(CreateUserDto, ['profile']) {}
*/
// Estamos aplicando el PartialType a CreateUserDto pero omitiendo el campo 'profile'
// para que no sea requerido en el DTO de actualización y luego agregamos el campo 'profile'
// como opcional con validación anidada
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
  @ValidateNested()
  @Type(() => UpdateProfileDto)
  @IsOptional()
  profile: UpdateProfileDto;
}
