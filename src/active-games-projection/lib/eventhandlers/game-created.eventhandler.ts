import { GameCreatedEvent, IEventHandler } from "@tb/commons"

export class GameCreatedEventHandler implements IEventHandler<GameCreatedEvent> {
    execute = async (event: GameCreatedEvent) => {
       // TODO: implementation
    }
}