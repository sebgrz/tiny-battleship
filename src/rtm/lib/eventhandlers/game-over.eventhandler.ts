import { GameOverEvent, IEventHandler } from "@tb/commons";
import { sendEventIfCan } from ".";
import { rtm } from "..";

export class GameOverEventHandler implements IEventHandler<GameOverEvent> {
    execute = async (command: GameOverEvent) => {
        console.log(`GameOverEventHandler start - game id ${command.gameID}`)

        let json = JSON.stringify(command)
        sendEventIfCan(command.loserConnectionID, json, `loser client: "${command.loserConnectionID}" doesn't exists`)
        sendEventIfCan(command.winnerConnectionID, json, `winner client: "${command.winnerConnectionID}" doesn't exists`)

        console.log(`GameOverEventHandler end - game id ${command.gameID}`)
    }
}