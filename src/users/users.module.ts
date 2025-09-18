import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { EmailService } from 'src/email/email.service';
import { SmsService } from 'src/sms/sms.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, EmailService, SmsService]
})
export class UsersModule {}
