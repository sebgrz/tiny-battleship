import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import { eventsManager } from "./eventhandlers"
import env from 'dotenv'
import { GamesState } from "./state/games-state"
import grpc from "grpc"
import grpc_service_handlers from "./grpc"

env.config({ path: "../.env" })

export const gameProjection = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_GAME_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager,
    state: {games: {}} as GamesState
}

let start = async () => {
    console.log("game projection service is running")

    let srv = new grpc.Server()
    srv.addService(grpc_service_handlers.service, grpc_service_handlers.handler)
    srv.bindAsync(`0.0.0.0:${process.env.GAME_PROJECTION_SVC_GRPC_PORT}`,
        grpc.ServerCredentials.createInsecure(),
        (e, p) => {
            if (e) {
                console.error(e)
                return
            }

            console.log("game projection service is listening on port " + p)
        })
    srv.start()

    console.log("start events bus consumer...")
    await gameProjection.consumerEventBus.consume(async ev => {
        await gameProjection.eventsManager.execute(ev)
    })
}
start()