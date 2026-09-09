import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';
import { UpdateProfileDto } from './update-profile.dto.js';
import { IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

// La clase UpdateUserDto extiende de CreateUserDto usando PartialType, 
// lo que significa que todos los campos de CreateUserDto son opcionales 
// en UpdateUserDto. Esto es útil para las operaciones de actualización, 
// donde no es necesario proporcionar todos los campos del usuario.
export class UpdateUserDto extends PartialType(OmitType(CreateUserDto, ['profile'])) {
    @ValidateNested()
    @Type(() => UpdateProfileDto )
    @IsNotEmpty()
    profile: UpdateProfileDto;
}
