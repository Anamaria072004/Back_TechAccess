import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { enviroments } from '../enviroments';
import { join } from 'path';

const envFile = enviroments[process.env.NODE_ENV as keyof typeof enviroments] || enviroments.dev;
dotenv.config({ path: envFile });

const isProduction = process.env.NODE_ENV === 'production';

export const AppDataSource = new DataSource(
  isProduction && process.env.DATABASE_URL
    ? {
        type: 'postgres',
        url: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false,
        },
        synchronize: false,
        logging: true,
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }
    : {
        type: 'postgres',
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432', 10),
        username: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres',
        database: process.env.POSTGRES_DB || 'auth_db',
        synchronize: true,
        logging: true,
        entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
        migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      }
);  