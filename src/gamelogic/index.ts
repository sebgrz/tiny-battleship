import { EventStoreDB } from "../core/eventstore/eventstore.db";
import { IEventStore } from "../core/eventstore/eventstore";
import { commandsManager } from "./command-handlers";
import env  from "dotenv";

env.config()

export const gameLogic = {
    eventStore: new EventStoreDB(process.env.EVENTSTOREDB_ENDPOINT as string, "game_") as IEventStore,
    commandsManager: commandsManager
}