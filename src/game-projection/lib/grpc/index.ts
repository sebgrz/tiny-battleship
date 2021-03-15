import { GamesServiceService, IGamesServiceServer } from "@tb/protos-gen/games_grpc_pb";
import { GamePoint, GetGameRequest, GetGameResponse } from "@tb/protos-gen/games_pb";
import * as grpc from "grpc";
import { gameProjection } from "..";

class GamesServiceHandler implements IGamesServiceServer {
    getGame = (call: grpc.ServerUnaryCall<GetGameRequest>, callback: grpc.sendUnaryData<GetGameResponse>) => {
        let gameID = call.request.getGameid()
        let playerConnectionID = call.request.getPlayerconnectionid()

        let game = gameProjection.state.games[gameID]
        if (!game) {
            console.error(`GamesServiceHandler err: cannot find game with id ${gameID}`);
            callback({
                message: `cannot find game with id ${gameID}`,
                name: "GamesService error",
            }, null)
            return
        }

        let player = game.players.filter(f => f.connectionID === playerConnectionID)[0]
        let opponent = game.players.filter(f => f.connectionID !== playerConnectionID)[0]

        let playerBoard = new Array<GamePoint>()
        let opponentBoard = new Array<GamePoint>()
        for (let x = 0; x < player.board.length; x++) {
            for (let y = 0; y < player.board[x].length; y++) {
                let point = new GamePoint()
                point.setX(x)
                point.setY(y)
                point.setState(player.board[x][y])

                playerBoard.push(point)

                // Opponent logic
                // We we don't want to show oppenent's ships positions so it's needed add a small filtering here 
                // for these states: 0 - field, 2 - miss, 3 - hit (1 - ship is disallow in this case)
                let pointState = opponent.board[x][y]
                point = new GamePoint()
                point.setX(x)
                point.setY(y)
                point.setState(pointState === 1 ? 0 : pointState)
                opponentBoard.push(point)
            }
        }
        let res = new GetGameResponse()
        res.setBoardList(playerBoard)
        res.setOpponentboardList(opponentBoard)
        res.setShipcounts(player.shipsCount)
        res.setOpponentshipcounts(opponent.shipsCount)

        callback(null, res)
    }
}

export default {
    handler: new GamesServiceHandler(),
    service: GamesServiceService
}