import express from "express"
import env from "dotenv"
import bodyParser from "body-parser"
import { handlers } from "./handlers"
import { IEventBusSender, RabbitMQEventBus } from "@tb/core"
import grpc from "grpc"
import { GamesServiceClient } from "@tb/protos-gen/games_grpc_pb";
import { ActiveGamesServiceClient } from "@tb/protos-gen/active-games_grpc_pb";

env.config({path: "../.env"})

export const gateway = {
    producerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMES_EXCHANGE as string
    ) as IEventBusSender,
    gamesServiceClient: new GamesServiceClient(`localhost:${process.env.GAME_PROJECTION_SVC_GRPC_PORT}`, grpc.credentials.createInsecure()),
    activeGamesServiceClient: new ActiveGamesServiceClient(`localhost:${process.env.ACTIVE_GAMES_PROJECTION_SVC_GRPC_PORT}`, grpc.credentials.createInsecure()),
}

const PORT = process.env.GATEWAY_PORT as string
const app = express()
app.use(bodyParser.json());

app.post("/create-game", handlers.createGameHandler)
app.post("/join-game", handlers.joinGameHandler)
app.get("/leave-game/:gameId/:connectionId", handlers.leaveGameHandler)
app.get("/shot/:gameId/:connectionId/:x/:y", handlers.shotHandler)

app.listen(PORT, () => {
    console.log(`gateway api is listening on ${PORT} port`)
})