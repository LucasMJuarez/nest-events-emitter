import { UserPlainObject } from "./user.plain-object";

export class User {
    constructor(
        public readonly id: number,
        public readonly email: string,
        public readonly name: string,
        public readonly phonenumber: number,
    ) {}

    public toPlainToObject (): UserPlainObject {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            phonenumber: this.phonenumber,
        };
    }
}