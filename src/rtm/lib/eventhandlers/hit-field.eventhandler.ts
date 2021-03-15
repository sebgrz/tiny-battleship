import { HitFieldEvent, IEventHandler } from "@tb/commons";
import { sendEventIfCan } from ".";
import { rtm } from "..";

export class HitFieldEventHandler implements IEventHandler<HitFieldEvent>{
    execute = async (command: HitFieldEvent) => {
        console.log(`HitFieldEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        sendEventIfCan(command.whoGotHitConnectionID, json, `whoGotHit client: "${command.whoGotHitConnectionID}" doesn't exists`)
        sendEventIfCan(command.whoShotConnectionID, json, `whoShot client: "${command.whoShotConnectionID}" doesn't exists`)

        console.log(`HitFieldEventHandler end - game id: ${command.gameID}`)
    }

}