import { HitFieldEvent, IEventHandler } from "@tb/commons";
import { rtm } from "..";

export class HitFieldEventHandler implements IEventHandler<HitFieldEvent>{
    execute = async (command: HitFieldEvent) => {
        console.log(`HitFieldEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        if (!rtm.clients.clients[command.whoGotHitConnectionID]) {
            console.log(`whoGotHit client: "${command.whoGotHitConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.whoGotHitConnectionID].emit(json)
        }

        if (!rtm.clients.clients[command.whoShotConnectionID]) {
            console.log(`whoShot client: "${command.whoShotConnectionID}" doesn't exists`)
        } else {
            rtm.clients.clients[command.whoShotConnectionID].emit(json)
        }

        console.log(`HitFieldEventHandler end - game id: ${command.gameID}`)
    }

}