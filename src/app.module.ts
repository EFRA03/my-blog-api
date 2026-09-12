import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './users/users.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Env } from './config/env.model.js';
import { PostsModule } from './posts/posts.module.js';
import { AuthModule } from './auth/auth.module.js';

@Module({
  imports: [
    // Estamos importando el modulo de configuracion para poder 
    // usar variables de entorno en toda la aplicacion
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      // Estamos usando el metodo forRootAsync para poder usar 
      // variables de entorno en la configuracion de TypeORM
      useFactory: (configService: ConfigService<Env>) => ({
      type: 'postgres',
      host: configService.get('POSTGRES_HOST', { infer: true }),
      port: configService.get('POSTGRES_PORT', { infer: true }),
      username: configService.get('POSTGRES_USER', { infer: true }),
      password: configService.get('POSTGRES_PASSWORD', { infer: true }),
      database: configService.get('POSTGRES_DB', { infer: true }),
      autoLoadEntities: true,
      synchronize: false, // peligroso en produccion es mejor que este en false
      }),
      // Estamos inyectando el servicio de configuracion 
      // para poder usar
      inject: [ConfigService],
    }),
    UsersModule,
    PostsModule,
    AuthModule,
  ],
})
export class AppModule {}
