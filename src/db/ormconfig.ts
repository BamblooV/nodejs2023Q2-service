import * as dotenv from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: parseInt(process.env.POSTGRES_PORT) | 5432,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  entities: ['dist/**/entities/*entity.js'],
  migrations: ['dist/**/migrations/*.js'],
  logging: false,
  migrationsRun: true,
  synchronize: false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource.initialize();
