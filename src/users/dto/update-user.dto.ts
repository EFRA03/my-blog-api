import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto.js';

// La clase UpdateUserDto extiende de CreateUserDto usando PartialType, 
// lo que significa que todos los campos de CreateUserDto son opcionales 
// en UpdateUserDto. Esto es útil para las operaciones de actualización, 
// donde no es necesario proporcionar todos los campos del usuario.
export class UpdateUserDto extends PartialType(CreateUserDto) {}
