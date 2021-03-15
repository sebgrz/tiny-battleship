import { GameCreatedEvent, IEventHandler } from "@tb/commons";
import { gameProjection } from "..";

export class GameCreatedEventHandler implements IEventHandler<GameCreatedEvent> {
    execute = async (command: GameCreatedEvent) => {
        console.log(`GameCreatedEventHandler start - game: ${command.gameID}`)
        
        let state = gameProjection.state
        state.games[command.gameID] = {
            id: command.gameID,
            name: command.name,
            winnerPlayerID: "",
            players: [
                {
                    connectionID: command.creatorConnectionId,
                    username: command.creatorPlayer,
                    board: command.creatoreBoard!,
                    shipsCount: command.shipsCount
                }
            ]
        }

        console.log(`GameCreatedEventHandler end - game: ${command.gameID}`)
    }

}