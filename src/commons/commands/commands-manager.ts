import { ICommand } from "./command"
import {ICommandHandler } from "./commandhandler"

export class CommandsManager {
    maps = new Map<string, new() => any>()

    register<TCommand, TCommandHandler>(commandType: new() => TCommand, commandHandlerType: new() => TCommandHandler) {
        let t = ((new commandType()) as unknown) as ICommand
        this.maps.set(t.type, commandHandlerType)
    }

    async execute<T extends ICommand> (command: T): Promise<void> {
        let t  = command.type
        if (!this.maps.has(t)){
            throw new Error(`commandhandler for type ${t} doesn't exist`)
        }
        let ts = this.maps.get(t)!
        let ch = (new ts) as unknown as ICommandHandler<T>
        await ch.execute(command)
    }
}