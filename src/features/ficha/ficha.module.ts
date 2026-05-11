import { Module } from '@nestjs/common';
import { FichaController } from './controllers/ficha/ficha.controller';
import { FichaService } from './services/ficha/ficha.service';
import { Ficha } from './entities/ficha.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Ficha])], 
  controllers: [FichaController],
  providers: [FichaService],
  exports: [FichaService],
})
export class FichaModule {}
