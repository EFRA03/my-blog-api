import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service.js';
import { User } from '../../users/entities/user.entity.js';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    // 'local' debe coincidir con el nombre en PassportStrategy de local.strategy.ts, incluidas las mayúsculas y minúsculas.
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        const user = req.user as User;
        return {
            user,
            access_token: this.authService.generateToken(user),
        };
    }
}
