import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import env from "dotenv"
import { eventsManager } from "./eventhandlers"
import { GamesState } from "./state/games.state"
import grpc_handlers from "./grpc/index"
import * as grpc from "grpc"

env.config({ path: "../.env" })

export const activeGamesProjection = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_ACTIVEGAMES_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager,
    state: { games: [] } as GamesState
}

let start = async () => {
    console.log("active games projection service is running")

    let srv = new grpc.Server()
    srv.addService(grpc_handlers.service, grpc_handlers.handler)
    srv.bindAsync(`0.0.0.0:${process.env.ACTIVE_GAMES_PROJECTION_SVC_GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (e, p) => {
            if (e) {
                console.error(e)
                return
            }
            console.log(`service is listening on port ${p}`)
        })
    srv.start()

    console.log("start events bus consumer...")
    await activeGamesProjection.consumerEventBus.consume(async ev => {
        await activeGamesProjection.eventsManager.execute(ev)
    })
}

start()