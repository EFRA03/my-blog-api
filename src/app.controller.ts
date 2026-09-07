import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service.js';
import { UsersService } from './users/users.service.js';
import { Env } from './config/env.model.js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // inyectamos una nueva dependencia
    private readonly usersService: UsersService,
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    // obtenemos los variables de entorno usando el servicio de configuracion
    const myVar = this.configService.get('MY_VAR', { infer: true });
    // obtenemos el mensaje del servicio de aplicacion
    const message = this.appService.getHello();
    return `Message: ${message}, MyVar: ${myVar}`;
  }

  // Solo es un ejemplo de como podemos inyectar un servicio en otro 
  // servicio, en este caso estamos inyectando el servicio de usuarios 
  // en el controlador principal
  @Get('my-test')
  getMyTest() {
    return this.usersService.findAll();
  }
}
