import { DataSource } from 'typeorm';
import config from '../config';
import * as dotenv from 'dotenv';
import { enviroments } from '../enviroments';
import { join } from 'path';

const envFile = enviroments[process.env.NODE_ENV as keyof typeof enviroments] || enviroments.dev;
dotenv.config({ path: envFile });
const configuration = config();

// Determinar si estamos en producción (Render)
const isProduction = process.env.NODE_ENV === 'production';

// Usar DATABASE_URL en producción o variables separadas en desarrollo
const getDataSourceConfig = () => {
  if (isProduction && process.env.DATABASE_URL) {
    // ⭐ Configuración para Render con SSL
    return {
      type: 'postgres' as const,
      url: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false, // ⭐ CRÍTICO: Permite SSL sin verificar certificado
      },
      synchronize: false, // ⚠️ SIEMPRE false en producción
      logging: true,
      entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
      migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
      // Configuración adicional para Render
      extra: {
        ssl: {
          rejectUnauthorized: false,
        },
      },
    };
  }

  // ⭐ Configuración para desarrollo local
  return {
    type: 'postgres' as const,
    host: configuration.dataBase.host,
    port: configuration.dataBase.port,
    username: configuration.dataBase.user,
    password: configuration.dataBase.password,
    database: configuration.dataBase.name,
    synchronize: true, // Solo en desarrollo
    logging: true,
    entities: [join(__dirname, '..', '**', '*.entity.{ts,js}')],
    migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  };
};

export const AppDataSource = new DataSource(getDataSourceConfig());