import { IEventHandler, MishitFieldEvent } from "@tb/commons";
import { rtm } from "..";

export class MishitFieldEventHandler implements IEventHandler<MishitFieldEvent>{
    execute = async (command: MishitFieldEvent) => {
        console.log(`MishitFieldEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        if (!(command.whoShotConnectionID in rtm.clients.clients)) {
            console.log(`whoShot client: "${command.whoShotConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.whoShotConnectionID].emit(json)
        }

        if (!(command.whoGotMishitConnectionID in rtm.clients.clients)) {
            console.log(`whoGotMishit client: "${command.whoGotMishitConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.whoGotMishitConnectionID].emit(json)
        }

        console.log(`MishitFieldEventHandler end - game id: ${command.gameID}`)
    }

}