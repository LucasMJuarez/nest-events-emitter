import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-object';
import { CreateUserDto } from './application/dtos/create.user.dto';

@Injectable()
export class UsersService {
    //bdd 
    // email 
    //sms

    private users: User[] = []

    public getAll(): UserPlainObject[] {
        return this.users.map(user => user.toPlainToObject());
    }


    public create(data: CreateUserDto): void {

        if (this.users.some((user) => user.id === data.id || user.email === data.email || user.phonenumber === data.phonenumber)) {
            throw new ConflictException('User already exists');
        }

        const user = new User(data.id, data.email, data.name, data.phonenumber);
        this.users.push(user);
    }
}
