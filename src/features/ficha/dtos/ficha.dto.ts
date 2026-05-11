import { IsString, IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class FichaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: '123456',
        description: 'Número de ficha',
    })
    numficha!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'ADSO',
        description: 'Programa de formación',
    })
    programa!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Tecnólogo',
        description: 'Nivel de formación  (Operario, Técnico, Tecnólogo)',
    })
    nivelFormacion!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        example: 'Diurna',
        description: 'Jornada de estudio (Mañana, Tarde, Noche)',
    })
    jornada!: string;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        example: '2024-02-01',
        description: 'Fecha de inicio de la ficha ',
    })
    fechaInicio!: Date;

    @IsDateString()
    @IsNotEmpty()
    @ApiProperty({
        example: '2025-02-01',
        description: 'Fecha de finalización de la ficha ',
    })
    fechafin!: Date;

    @IsString()
    @IsOptional()
    @ApiProperty({
        example: 'Activa',
        description: 'Estado de la ficha (Activa, Inactiva, Finalizada, etc.)',
        required: false,
    })
    estado?: string;
}

export class UpdateFichaDto extends PartialType(FichaDto) {}