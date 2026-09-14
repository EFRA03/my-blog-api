import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config();

export default new DataSource({
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  // La CLI carga el JavaScript compilado en dist para evitar el problema de ts-node con Swagger.
  entities: ['./dist/**/*.entity.js'],
  migrations: ['./dist/database/migrations/*.js'],
  synchronize: false,
});
