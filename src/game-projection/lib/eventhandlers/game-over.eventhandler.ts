import { GameOverEvent, IEventHandler } from "@tb/commons";
import { gameProjection } from "..";

export class GameOverEventHandler implements IEventHandler<GameOverEvent> {
    execute = async (command: GameOverEvent) => {
        console.log(`GameOverEventHandler start - game id ${command.gameID}`)

        let state = gameProjection.state
        let game = state.games[command.gameID]

        if (!game) {
            console.error(`GameOverEventHandler err: game ${command.gameID} doesn't exists`)
            return
        }
        game.winnerPlayerID = command.winnerConnectionID

        console.log(`GameOverEventHandler end - game id ${command.gameID}`)
    }
}