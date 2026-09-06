import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
export class CreateUserDto {
  @IsString({
    message: 'El nombre debe ser una cadena de texto',
  })
  @IsNotEmpty()
  name: string;

  @IsEmail({}, { message: 'El correo electrónico no es válido' })
  @IsNotEmpty()
  email: string;
}
