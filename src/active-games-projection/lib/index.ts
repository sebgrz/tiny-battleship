import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import env from "dotenv"

env.config({ path: "../../.env" })

export const activeGamesProjection = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_ACTIVEGAMES_QUEUE as string) as IEventBusConsumer
}

let start = async () => {
    console.log("active games projection service is running")
    await activeGamesProjection.consumerEventBus.consume(async ev => {
        // await activeGamesProjection.commandsManager.execute(ev)
    })
}

start()