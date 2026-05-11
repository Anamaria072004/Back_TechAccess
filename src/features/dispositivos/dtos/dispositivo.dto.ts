import { IsString, IsNotEmpty, IsInt } from "class-validator";
import { Type } from "class-transformer";
import { PartialType, ApiProperty } from "@nestjs/swagger";

export class CreateDispositivoDto{

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly tipoDispositivo!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly marca!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    readonly color!: string;

    @IsInt({ each: true })
    @Type(() => Number)
    @ApiProperty()
    readonly usuarioId!: number;
}

export class UpdateDispositivo extends PartialType(CreateDispositivoDto){}