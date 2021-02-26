import * as grpc from "grpc";
import { IActiveGamesServiceServer, ActiveGamesServiceService } from "@tb/protos-gen/active-games_grpc_pb"
import { GetGamesResponse, GetGamesRequest, Game } from "@tb/protos-gen/active-games_pb"
import { activeGamesProjection } from "..";

class ActiveGamesServiceHandler implements IActiveGamesServiceServer {
    getGames = (call: grpc.ServerUnaryCall<GetGamesRequest>, callback: grpc.sendUnaryData<GetGamesResponse>): void => {
        console.log("getGames start")
        let games = activeGamesProjection.state.games
        let resGames = games.map(m => {
            let g = new Game()
            g.setId(m.id)
            g.setIsopen(m.isOpen)
            g.setName(m.name)
            return g
        })
        
        let response = new GetGamesResponse()
        response.setGamesList(resGames)

        callback(null, response)
        console.log("getGames end")
    }
}

export default {
    service: ActiveGamesServiceService,
    handler: new ActiveGamesServiceHandler()
}