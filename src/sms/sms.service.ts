import { Injectable } from "@nestjs/common";

@Injectable()
export class SmsService {
    public sendSms(phonenumber: number, message: string): void {
        console.log(`Sending SMS to: ${phonenumber}, Message: ${message}`);
    }
}
