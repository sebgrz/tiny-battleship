import { commandsManager } from "./command-handlers";
import env from "dotenv";
import { EventStoreDB, IEventBusConsumer, IEventStore, RabbitMQEventBus } from "@tb/core";

env.config()

export const gameLogic = {
    eventStore: new EventStoreDB(process.env.EVENTSTOREDB_ENDPOINT as string, "game_") as IEventStore,
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string, 
        process.env.RABBITMQ_GAMES_EXCHANGE as string,
        process.env.RABBITMQ_GAMES_QUEUE as string) as IEventBusConsumer,
    commandsManager: commandsManager
}

let start = async () => {
    console.log("game logic service is running")
    await gameLogic.consumerEventBus.consume(async ev => {
        await gameLogic.commandsManager.execute(ev)
    })
}

start()