import { IEventHandler, MishitFieldEvent } from "@tb/commons";
import { sendEventIfCan } from ".";
import { rtm } from "..";

export class MishitFieldEventHandler implements IEventHandler<MishitFieldEvent>{
    execute = async (command: MishitFieldEvent) => {
        console.log(`MishitFieldEventHandler start - game id: ${command.gameID}`)

        let json = JSON.stringify(command)
        sendEventIfCan(command.whoShotConnectionID, json, `whoShot client: "${command.whoShotConnectionID}" doesn't exists`)
        sendEventIfCan(command.whoGotMishitConnectionID, json, `whoGotMishit client: "${command.whoGotMishitConnectionID}" doesn't exists`)

        console.log(`MishitFieldEventHandler end - game id: ${command.gameID}`)
    }

}