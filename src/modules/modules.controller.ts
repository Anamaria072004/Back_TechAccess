import { Controller, Get, Post, Body, Module, UseGuards } from '@nestjs/common';
import { ModulesService } from './modules.service';
import { CreateModuleDto } from './dtos/create-module.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';
import { ModulesGuard } from 'src/auth/guards/modules.guard.guard';
import { Modules } from 'src/auth/decorators/modules.decorator';

@ApiTags('Modules')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard) // Temporalmente sin ModulesGuard para permitir configuración inicial
// @UseGuards(JwtAuthGuard, ModulesGuard)
@Controller('modules')
export class ModulesController {

  constructor(private readonly modulesService: ModulesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new module' })
  create(@Body() dto: CreateModuleDto) {
    return this.modulesService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  findAll() {
    return this.modulesService.findAll();
  }

}