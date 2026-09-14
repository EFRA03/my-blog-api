
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './../services/auth.service.js';

// 'local' debe coincidir con el nombre en AuthGuard de auth.controller.ts, incluidas las mayúsculas y minúsculas.
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private authService: AuthService) {
        // Configura los campos que Passport utilizará para autenticar al usuario.
        super({
            // Indica que el campo que identifica al usuario será "email".
            usernameField: 'email',
            // Indica que el campo que contiene la contraseña será "password".
            passwordField: 'password',
        });
    }

    async validate(email: string, password: string) {
        const user = await this.authService.validateUser(email, password);
        return user;
    }
}
