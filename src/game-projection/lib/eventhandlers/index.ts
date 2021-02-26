import { EventsManager, GameCreatedEvent } from "@tb/commons"
import { GameCreatedEventHandler } from "./game-created.eventhandler"

export const eventsManager = new EventsManager()
eventsManager.register(GameCreatedEvent, GameCreatedEventHandler)