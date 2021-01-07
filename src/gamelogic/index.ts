import { EventStoreDB } from "../core/eventstore/eventstore.db";
import { IEventStore } from "../core/eventstore/eventstore";
import { commandsManager } from "./command-handlers";

export const gameLogic = {
    eventStore: new EventStoreDB(process.env.eventstoredb_endpoint as string, "game_") as IEventStore,
    commandsManager: commandsManager
}