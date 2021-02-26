import { HitFieldEvent, IEventHandler } from "@tb/commons";
import { gameProjection } from "..";

export class HitFieldEventHandler implements IEventHandler<HitFieldEvent>{
    execute = async  (command: HitFieldEvent) => {
        console.log(`HitFieldEventHandler start - game id: ${command.gameID}`)
        
        let game = gameProjection.state.games[command.gameID]
        if (!game) {
            console.error(`HitFieldEventHandler err: game id ${command.gameID} doesn't exists`)            
            return
        }

        let player = game.players.filter(f => f.connectionID === command.whoGotHitConnectionID)[0]
        player.board[command.hitPosition!.x][command.hitPosition!.y] = 3
        player.shipsCount--

        console.log(`HitFieldEventHandler end - game id: ${command.gameID}`)
    }

}