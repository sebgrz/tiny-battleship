import { EventsManager, GameCreatedEvent, GameOverEvent, HitFieldEvent, JoinedToGameEvent, MishitFieldEvent } from "@tb/commons";
import { GameOverEventHandler } from "./game-over.eventhandler";
import { HitFieldEventHandler } from "./hit-field.eventhandler";
import { JoinedToGameEventHandler } from "./joined-to-game.eventhandler";
import { MishitFieldEventHandler } from "./mishit-field.eventhandler";

export const eventsManager = new EventsManager()
eventsManager.register(GameOverEvent, GameOverEventHandler)
eventsManager.register(HitFieldEvent, HitFieldEventHandler)
eventsManager.register(MishitFieldEvent, MishitFieldEventHandler)
eventsManager.register(JoinedToGameEvent, JoinedToGameEventHandler)