import { IEvent } from "./event"
import { IEventHandler } from "./eventhandler"

export class EventsManager {
    maps = new Map<string, new () => any>()

    register<TCommand, TCommandHandler>(commandType: new () => TCommand, commandHandlerType: new () => TCommandHandler) {
        let t = ((new commandType()) as unknown) as IEvent
        this.maps.set(t.type, commandHandlerType)
    }

    async execute<T extends IEvent>(command: T): Promise<void> {
        let t = command.type
        if (!this.maps.has(t)) {
            throw new Error(`commandhandler for type ${t} doesn't exist`)
        }
        let ts = this.maps.get(t)!
        let ch = (new ts) as unknown as IEventHandler<T>
        await ch.execute(command)
    }
}