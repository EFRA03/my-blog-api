import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    // Valida las credenciales de un usuario por email y contraseña
    async validateUser(email: string, pass: string) {
        // 1. Buscar el usuario en la base de datos por su email
        const user = await this.usersService.getUserByEmail(email);
        // 2. Si no existe, lanzar excepción de acceso no autorizado
        if (!user) {
        throw new UnauthorizedException('Unauthorized');
        }
        // 3. Comparar la contraseña ingresada con el hash almacenado
        const isMatch = await bcrypt.compare(pass, user.password);
        // 4. Si NO coincide, lanzar excepción de acceso no autorizado
        if (!isMatch) {
        throw new UnauthorizedException('Unauthorized');
        }
        // 5. Si coincide, devolver el objeto usuario
        return user;
    }
}
