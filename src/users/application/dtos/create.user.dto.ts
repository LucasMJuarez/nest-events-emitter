import { IsEmail, IsNumber, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    public readonly id: string;
    @IsString()
    @IsEmail()
    public readonly email: string;
    @IsString()
    public readonly name: string;
    @IsNumber()
    public readonly phonenumber: number;
} 