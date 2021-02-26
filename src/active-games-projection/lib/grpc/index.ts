import * as grpc from "grpc";
import { IActiveGamesServiceServer, ActiveGamesServiceService } from "@tb/protos-gen/active-games_grpc_pb"
import { GetGamesResponse, GetGamesRequest } from "@tb/protos-gen/active-games_pb"

class ActiveGamesServiceHandler implements IActiveGamesServiceServer {
    getGames = (call: grpc.ServerUnaryCall<GetGamesRequest>, callback: grpc.sendUnaryData<GetGamesResponse>): void => {
    }
}

export default {
    service: ActiveGamesServiceService,
    handler: new ActiveGamesServiceHandler()
}