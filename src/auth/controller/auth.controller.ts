import { Controller, Post, UseGuards, Req } from '@nestjs/common';
import type { Request } from 'express';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    // 'local' debe coincidir con el nombre en PassportStrategy de local.strategy.ts, incluidas las mayúsculas y minúsculas.
    @UseGuards(AuthGuard('local'))
    @Post('login')
    login(@Req() req: Request) {
        return req.user;
    }
}
