import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './application/dtos/create.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}


    @Get()
    public getAll(){
        return this.usersService.getAll();
    
    } 

    @Post()
    @UsePipes(new ValidationPipe()) //para que nest valide que el body es realmente un CreateUserDto
    public create(@Body() body: CreateUserDto): void{
        return this.usersService.create(body);
    }
}
