import { EventsManager, GameCreatedEvent, GameOverEvent } from "@tb/commons";
import { GameCreatedEventHandler } from "./game-created.eventhandler";
import { GameOverEventHandler } from "./game-over.eventhandler";

export const eventsManager = new EventsManager()
eventsManager.register(GameCreatedEvent, GameCreatedEventHandler)
eventsManager.register(GameOverEvent, GameOverEventHandler)