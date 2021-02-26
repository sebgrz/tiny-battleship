import { GameCreatedEvent, IEventHandler, JoinedToGameEvent } from "@tb/commons"
import { activeGamesProjection } from ".."

export class JoinedToGameEventHandler implements IEventHandler<JoinedToGameEvent> {
    execute = async (event: JoinedToGameEvent) => {
        let games = activeGamesProjection.state.games.filter(f => f.id === event.gameID)
        if (games.length > 0){
            let game = games[0]
            game.isOpen = false
        }
    }
}