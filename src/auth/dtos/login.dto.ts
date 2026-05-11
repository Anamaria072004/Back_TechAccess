/* eslint-disable prettier/prettier */
import { IsString, IsNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'user@email.com' })
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '123456' })
    readonly password: string;

    //@IsBoolean()
    //@IsNotEmpty()
    //@ApiProperty()
    //readonly isActive: boolean;
}