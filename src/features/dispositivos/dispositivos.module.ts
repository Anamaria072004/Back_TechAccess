import { Module } from '@nestjs/common';
import { DispositivosService } from './services/dispositivos/dispositivos.service';
import { DispositivosController } from './controllers/dispositivos/dispositivos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dispositivo } from './entities/dispositivo.entity';
import { User } from 'src/features/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dispositivo, User])],
  providers: [DispositivosService],
  controllers: [DispositivosController],
  exports: [DispositivosService]

})
export class DispositivosModule {}
