import { GameOverEvent, IEventHandler } from "@tb/commons"
import { activeGamesProjection } from ".."

export class GameOverEventHandler implements IEventHandler<GameOverEvent> {
    execute = async (event: GameOverEvent) => {
        let toRemove = activeGamesProjection.state.games.filter(f => f.id === event.gameID)[0]
        let index = activeGamesProjection.state.games.indexOf(toRemove)
        activeGamesProjection.state.games.splice(index, 1)
    }
}