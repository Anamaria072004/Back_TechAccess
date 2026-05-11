import { ArrayNotEmpty, IsArray, IsInt, IsNotEmpty, IsString } from "class-validator";
import { Type } from "class-transformer";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateVehiculoDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'ABC123' })//para mejor validacion, quitar si es necesario
    readonly placa!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly  tipoVehiculo!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly marca!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly color!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly modelo!: string;

    @IsInt({ each: true })
    @Type(() => Number)
    @ApiProperty()
    readonly usuarioId!: number;

}
export class UpdateVehiculoDto extends PartialType(CreateVehiculoDto) { }