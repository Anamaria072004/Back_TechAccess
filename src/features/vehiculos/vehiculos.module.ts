import { Module } from '@nestjs/common';
import { VehiculosController } from './controllers/vehiculos/vehiculos.controller';
import { VehiculosService } from './services/vehiculos/vehiculos.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehiculo } from './entities/vehiculo.entity';
import { User } from 'src/features/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vehiculo, User])],
  controllers: [VehiculosController],
  providers: [VehiculosService],
  exports: [VehiculosService],
})
export class VehiculosModule {}