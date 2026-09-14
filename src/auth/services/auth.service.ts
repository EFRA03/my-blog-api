import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../../users/users.service.js';
import type { User } from '../../users/entities/user.entity.js';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '../models/payload.model.js';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

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

    // Recibe un usuario del tipo User y genera un JWT que lo identifica.
    generateToken(user: User) {
        // El payload contiene los datos que incluimos en el token.
        // 'sub' significa 'subject': aquí guarda el ID del usuario al que pertenece el token.
        const payload: Payload = { sub: user.id };

        // sign() firma el payload con la clave configurada y devuelve el JWT como texto.
        // La firma permite verificar que el contenido no fue alterado; no lo cifra.
        return this.jwtService.sign(payload);
    }
}
