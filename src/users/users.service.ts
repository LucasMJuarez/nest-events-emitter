import { ConflictException, Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-object';
import { CreateUserDto } from './application/dtos/create.user.dto';
import { EmailService } from 'src/email/email.service';
import { SmsService } from 'src/sms/sms.service';

@Injectable()
export class UsersService {
    // hacemos uso de la inyeccion de dependencias por constructor

    constructor( private readonly emailService: EmailService,  private readonly smsService: SmsService) {}

    private users: User[] = []

    public getAll(): UserPlainObject[] {
        return this.users.map(user => user.toPlainToObject());
    }


    public create(data: CreateUserDto): void {
        // VALIDA EL USER
        if (this.users.some((user) => user.id === data.id || user.email === data.email || user.phonenumber === data.phonenumber)) {
            throw new ConflictException('User already exists');
        }
        // CREA UNA INSTANCIA DEL USUARIO

        const user = new User(data.id, data.email, data.name, data.phonenumber);
        // AGREGA AL USER A LA BASE DE DATOS

        this.users.push(user);
        // SIMULAR EL ENVIO DE MAIL Y SMS
        this.emailService.sendEmail(data.email, 'Welcome!', 'Thanks for joining us!');
        this.smsService.sendSms(data.phonenumber, 'Welcome to our service!');
    }
}
