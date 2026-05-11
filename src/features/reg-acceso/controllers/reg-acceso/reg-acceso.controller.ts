import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { RegAccesoService } from '../../services/reg-acceso/reg-acceso.service';
import { CreateAccesoDto, UpdateAccesoDto } from '../../dtos/acceso.dto';
import { Acceso } from '../../entities/acceso.entity';

@Controller('reg-acceso')
export class RegAccesoController {
  constructor(private readonly regAccesoService: RegAccesoService) {}

  @Post()
  async create(@Body() createAccesoDto: CreateAccesoDto): Promise<Acceso> {
    return this.regAccesoService.create(createAccesoDto);
  }

  @Get()
  async findAll(): Promise<Acceso[]> {
    return this.regAccesoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Acceso> {
    return this.regAccesoService.findOne(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateAccesoDto: UpdateAccesoDto,
  ): Promise<Acceso> {
    return this.regAccesoService.update(id, updateAccesoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.regAccesoService.remove(id);
  }
}