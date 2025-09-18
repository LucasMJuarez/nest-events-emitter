import { Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-object';

@Injectable()
export class UsersService {
    //bdd 
    // email 
    //sms

    private users: User[] =[]

    public getAll(): UserPlainObject[] {
        return this.users.map(user => user.toPlainToObject());
    }
    public create( email: string, name: string, phonenumber: number): void {
        const user = new User(this.users.length + 1, email, name, phonenumber);
        this.users.push(user);
    }
}
