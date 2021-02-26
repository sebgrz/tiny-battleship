import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import { eventsManager } from "./eventhandles"
import env from 'dotenv'

env.config({ path: "../.env" })

export const gameProjection = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_GAME_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager
}

let start = async () => {
    console.log("game projection service is running")

    await gameProjection.consumerEventBus.consume(async ev => {
        await gameProjection.eventsManager.execute(ev)
    })
}
start()