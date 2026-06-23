import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const isProduction = process.env.NODE_ENV === 'production';
        const databaseUrl = configService.get('DATABASE_URL');

        console.log('🔍 NODE_ENV:', process.env.NODE_ENV);
        console.log('🔍 isProduction:', isProduction);
        console.log('🔍 DATABASE_URL existe:', !!databaseUrl);

        // ⭐ CONFIGURACIÓN PARA PRODUCCIÓN (RENDER)
        if (isProduction && databaseUrl) {
          console.log('✅ Usando configuración de producción con SSL');
          return {
            type: 'postgres',
            url: databaseUrl,
            ssl: {
              rejectUnauthorized: false,
            },
            synchronize: false, // ⚠️ IMPORTANTE: false en producción
            logging: true,
            entities: [__dirname + '/../**/*.entity{.ts,.js}'],
            migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
            // Configuración extra para asegurar SSL
            extra: {
              ssl: {
                rejectUnauthorized: false,
              },
            },
          };
        }

        // ⭐ CONFIGURACIÓN PARA DESARROLLO LOCAL
        console.log('✅ Usando configuración de desarrollo local');
        return {
          type: 'postgres',
          host: configService.get('POSTGRES_HOST'),
          port: configService.get('POSTGRES_PORT'),
          username: configService.get('POSTGRES_USER'),
          password: configService.get('POSTGRES_PASSWORD'),
          database: configService.get('POSTGRES_DB'),
          synchronize: true, // Solo en desarrollo
          logging: true,
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
        };
      },
    }),
  ],
})
export class DatabaseModule {}