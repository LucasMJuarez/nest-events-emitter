//hacemos una class que va a representar al event creado

export class UserCreatedEvent {
    constructor(
        public readonly userId: number,
    ) {}
}