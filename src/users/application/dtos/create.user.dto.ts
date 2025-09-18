import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsNumber()
    public readonly id: number;
    @IsString()
    @IsEmail()
    public readonly email: string;
    @IsString()
    public readonly name: string;
    @IsNumber()
    public readonly phonenumber: number;
} 