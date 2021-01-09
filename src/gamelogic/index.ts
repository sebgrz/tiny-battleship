import { EventStoreDB } from "../core/eventstore/eventstore.db";
import { IEventStore } from "../core/eventstore/eventstore";
import { commandsManager } from "./command-handlers";
import { RabbitMQEventBus } from "../core/eventbus/rabbitmq.eventbus"
import { IEventBusConsumer } from "../core/eventbus/eventbus"
import env from "dotenv";

env.config()

export const gameLogic = {
    eventStore: new EventStoreDB(process.env.EVENTSTOREDB_ENDPOINT as string, "game_") as IEventStore,
    consumerEventBus: new RabbitMQEventBus(process.env.RABBITMQ_ENDPOINT as string, process.env.RABBITMQ_GAMES_EXCHANGE as string) as IEventBusConsumer,
    commandsManager: commandsManager
}

let start = async () => {
    console.log("game logic service is running")
    await gameLogic.consumerEventBus.consume(async ev => {
        await gameLogic.commandsManager.execute(ev)
    })
}

start()