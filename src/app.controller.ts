import { Controller, Get } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
import { UsersService } from './users/users.service';
import { Env } from './env.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    // Inyectamos el servicio de usuarios en el controlador
    private readonly usersService: UsersService,
    // Inyectamos el servicio de configuración para acceder a las variables de entorno
    private readonly configService: ConfigService<Env>,
  ) {}

  @Get()
  getHello(): string {
    // el infer: true le dice a TypeScript que infiera el tipo de la variable,
    // en este caso, string porque en el modelo de entorno se define como string
    const myVar = this.configService.get('MY_VAR', { infer: true });
    const message = this.appService.getHello();
    return `${message} ${myVar}`;
  }

  @Get('my-test')
  getTest() {
    return this.usersService.findAll();
  }
}
