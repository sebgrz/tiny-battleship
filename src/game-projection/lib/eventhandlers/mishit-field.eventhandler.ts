import { IEventHandler, MishitFieldEvent } from "@tb/commons";
import { gameProjection } from "..";

export class MishitFieldEventHandler implements IEventHandler<MishitFieldEvent>{
    execute = async (command: MishitFieldEvent) => {
        console.log(`MishitFieldEventHandler start - game id: ${command.gameID}`)

        let game = gameProjection.state.games[command.gameID]
        if (!game) {
            console.error(`MishitFieldEventHandler err: game id ${command.gameID} doesn't exists`)
            return
        }

        let player = game.players.filter(f => f.connectionID === command.whoGotMishitConnectionID)[0]
        player.board[command.mishitPosition!.x][command.mishitPosition!.y] = 2

        console.log(`MishitFieldEventHandler end - game id: ${command.gameID}`)
    }

}