import { EventsManager, GameCreatedEvent, JoinedToGameEvent } from "@tb/commons"
import { GameCreatedEventHandler } from "./game-created.eventhandler"
import { JoinedToGameEventHandler } from "./joined-to-game.eventhandler"

export const eventsManager = new EventsManager()
eventsManager.register(GameCreatedEvent, GameCreatedEventHandler)
eventsManager.register(JoinedToGameEvent, JoinedToGameEventHandler)