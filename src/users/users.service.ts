import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './domain/user';
import { UserPlainObject } from './domain/user.plain-object';
import { CreateUserDto } from './application/dtos/create.user.dto';
import { EmailService } from 'src/email/email.service';
import { SmsService } from 'src/sms/sms.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { UserCreatedEvent } from './domain/user.created.event';

@Injectable()
export class UsersService {
    // hacemos uso de la inyeccion de dependencias por constructor

    constructor(
        private readonly emailService: EmailService,
        private readonly smsService: SmsService,
        private readonly eventEmitter: EventEmitter2
    ) { }

    private users: User[] = []

    public getAll(): UserPlainObject[] {
        return this.users.map(user => user.toPlainToObject());
    }


    public create(data: CreateUserDto): void {
        // VALIDA EL USER
        this.ensureUserDoesNotExist(data);
        // CREA UNA INSTANCIA DEL USUARIO

        const user = new User(data.id, data.email, data.name, data.phonenumber);
        // AGREGA AL USER A LA BASE DE DATOS

        this.users.push(user);

        //emitimos el primer evento

        this.eventEmitter.emit('user.created', new UserCreatedEvent(user.id));

        //para que los methods siguientes se puedan "subscribir a él"
    }


    private ensureUserDoesNotExist(data: CreateUserDto): void {
        if (this.users.some((user) => user.id === data.id || user.email === data.email || user.phonenumber === data.phonenumber)) {
            throw new ConflictException('User already exists');
        }
    }

    //con el decorador OnEvent vamos a recibir el evento creado en create method
    //Primero en la secuencia de los eventos
    @OnEvent('user.created')
    private sendWelcomeEmail(payload: UserCreatedEvent): void {

        const user = this.getUserById(payload.userId);
        this.emailService.sendEmail(user.email, 'Welcome!', 'Thanks for joining us!');
    }
    //Segundo en la secuencia de los eventos
    @OnEvent('user.created')
    private sendWelcomeSms(payload: UserCreatedEvent): void {
        const user = this.getUserById(payload.userId);
        this.smsService.sendSms(user.phonenumber, 'Welcome to our service!');
    }
    

    private getUserById(userId: number): User {
        const user = this.users.find(user => user.id === userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }
}
