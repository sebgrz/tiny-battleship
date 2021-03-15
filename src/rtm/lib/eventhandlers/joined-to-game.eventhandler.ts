import { IEventHandler, JoinedToGameEvent } from "@tb/commons";
import { rtm } from "..";

export class JoinedToGameEventHandler implements IEventHandler<JoinedToGameEvent>{
    execute = async (command: JoinedToGameEvent) => {
        console.log(`JoinedToGameEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        if (!(command.connectionID in rtm.clients.clients)) {
            console.log(`creator client: "${command.connectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.connectionID].emit(json)
        }

        if (!(command.opponentConnectionID in rtm.clients.clients)) {
            console.log(`opponent client: "${command.opponentConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.opponentConnectionID].emit(json)
        }

        console.log(`JoinedToGameEventHandler end - game id: ${command.gameID}`)
    };

}