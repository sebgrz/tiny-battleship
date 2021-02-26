import { IEventHandler, JoinedToGameEvent } from "@tb/commons";
import { gameProjection } from "..";

export class JoinedToGameEventHandler implements IEventHandler<JoinedToGameEvent>{
    execute = async (command: JoinedToGameEvent) => {
        console.log(`JoinedToGameEventHandler start - game id: ${command.gameID}`)

        let state = gameProjection.state
        if (!state.games[command.gameID]) {
            console.error(`JoinedToGameEventHandler err: game id ${command.gameID} doesn't exists`)
            return
        }
        let game = state.games[command.gameID]
        game.players.push({
            connectionID: command.connectionID,
            username: command.player,
            board: command.board!
        })

        console.log(`JoinedToGameEventHandler end - game id: ${command.gameID}`)
    };

}