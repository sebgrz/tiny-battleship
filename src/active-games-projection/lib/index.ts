import { IEventBusConsumer, RabbitMQEventBus } from "@tb/core"
import env from "dotenv"
import { eventsManager } from "./eventhandlers"
import { GamesState } from "./state/games.state"

env.config({ path: "../../.env" })

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
    await activeGamesProjection.consumerEventBus.consume(async ev => {
        await activeGamesProjection.eventsManager.execute(ev)
    })
}

start()