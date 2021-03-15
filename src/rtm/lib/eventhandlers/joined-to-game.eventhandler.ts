import { IEventHandler, JoinedToGameEvent } from "@tb/commons";
import { sendEventIfCan } from ".";
import { rtm } from "..";

export class JoinedToGameEventHandler implements IEventHandler<JoinedToGameEvent>{
    execute = async (command: JoinedToGameEvent) => {
        console.log(`JoinedToGameEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        sendEventIfCan(command.connectionID, json, `creator client: "${command.connectionID}" doesn't exists`)
        sendEventIfCan(command.opponentConnectionID, json, `opponent client: "${command.opponentConnectionID}" doesn't exists`)

        console.log(`JoinedToGameEventHandler end - game id: ${command.gameID}`)
    };

}