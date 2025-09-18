import { Injectable } from "@nestjs/common";

@Injectable()
export class EmailService {
    public sendEmail(to: string, subject: string, body: string): void {
        console.log(`Sending email to: ${to}, Subject: ${subject}, Body: ${body}`);
    }
}