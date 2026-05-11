import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegAccesoService } from './services/reg-acceso/reg-acceso.service';
import { RegAccesoController } from './controllers/reg-acceso/reg-acceso.controller';
import { Acceso } from './entities/acceso.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Acceso])],
  controllers: [RegAccesoController],
  providers: [RegAccesoService],
  exports: [TypeOrmModule],
})
export class RegAccesoModule {}