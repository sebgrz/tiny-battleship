import { GameOverEvent, IEventHandler } from "@tb/commons";
import { rtm } from "..";

export class GameOverEventHandler implements IEventHandler<GameOverEvent> {
    execute = async (command: GameOverEvent) => {
        console.log(`GameOverEventHandler start - game id ${command.gameID}`)

        let json = JSON.stringify(command)
        if (!(command.loserConnectionID in rtm.clients.clients)) {
            console.log(`loser client: "${command.loserConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.loserConnectionID].emit(json)
        }

        if (!(command.winnerConnectionID in rtm.clients.clients)) {
            console.log(`winner client: "${command.winnerConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.winnerConnectionID].emit(json)
        }

        console.log(`GameOverEventHandler end - game id ${command.gameID}`)
    }
}