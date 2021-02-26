import { EventsManager, GameCreatedEvent, GameOverEvent, GetGamesRequest, JoinedToGameEvent } from "@tb/commons"
import { GameCreatedEventHandler } from "./game-created.eventhandler"
import { GameOverEventHandler } from "./game-over.eventhandler"
import { JoinedToGameEventHandler } from "./joined-to-game.eventhandler"

export const eventsManager = new EventsManager()
eventsManager.register(GameCreatedEvent, GameCreatedEventHandler)
eventsManager.register(JoinedToGameEvent, JoinedToGameEventHandler)
eventsManager.register(GameCreatedEvent, GameOverEventHandler)