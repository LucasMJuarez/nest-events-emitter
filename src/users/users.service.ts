import { Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-object';
import { CreateUserDto } from './application/dtos/create.user.dto';

@Injectable()
export class UsersService {
    //bdd 
    // email 
    //sms

    private users: User[] =[]

    public getAll(): UserPlainObject[] {
        return this.users.map(user => user.toPlainToObject());
    }
    public create( data: CreateUserDto): void {
        const user = new User(this.users.length + 1, data.email, data.name, data.phonenumber);
        this.users.push(user);
    }
}
