import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import { eventsManager } from "./eventhandlers"
import env from 'dotenv'
import { GamesState } from "./state/games-state"

env.config({ path: "../.env" })

export const gameProjection = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_GAME_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager,
    state: {} as GamesState
}

let start = async () => {
    console.log("game projection service is running")

    await gameProjection.consumerEventBus.consume(async ev => {
        await gameProjection.eventsManager.execute(ev)
    })
}
start()