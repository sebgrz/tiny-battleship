import { GameCreatedEvent, IEventHandler } from "@tb/commons"
import { activeGamesProjection } from ".."

export class GameCreatedEventHandler implements IEventHandler<GameCreatedEvent> {
    execute = async (event: GameCreatedEvent) => {
       activeGamesProjection.state.games.push({
           id: event.gameID,
           name: event.name,
           isOpen: true,
       })
    }
}