import { EventsManager, GameCreatedEvent, GameOverEvent, HitFieldEvent, JoinedToGameEvent, MishitFieldEvent } from "@tb/commons";
import { rtm } from "..";
import { GameOverEventHandler } from "./game-over.eventhandler";
import { HitFieldEventHandler } from "./hit-field.eventhandler";
import { JoinedToGameEventHandler } from "./joined-to-game.eventhandler";
import { MishitFieldEventHandler } from "./mishit-field.eventhandler";

export const eventsManager = new EventsManager()
eventsManager.register(GameOverEvent, GameOverEventHandler)
eventsManager.register(HitFieldEvent, HitFieldEventHandler)
eventsManager.register(MishitFieldEvent, MishitFieldEventHandler)
eventsManager.register(JoinedToGameEvent, JoinedToGameEventHandler)

export const sendEventIfCan = (connectionID: string, event: string, errorMessage: string) => {
    if (!(connectionID in rtm.clients.clients)){
        console.error(errorMessage)
        return
    } 
    rtm.clients.clients[connectionID].emit(event)
}