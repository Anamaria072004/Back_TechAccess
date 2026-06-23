import { ApiProperty, PartialType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAccesoDto {

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  readonly observacion?: string;

  @IsNotEmpty()
  @IsInt()
  @Type(() => Number)
  @ApiProperty()
  readonly usuarioId!: number;
}

export class UpdateAccesoDto extends PartialType(CreateAccesoDto){}