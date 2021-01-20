import { IEvent } from "@tb/commons";
import { GameState } from "./game.state";

export class GameAggregator {
    private pendingEvents: IEvent[] = []

    state?: GameState

    replay = (events: IEvent[]) => {
    }

    getPendingEvents = ():IEvent[] => {
        return this.pendingEvents
    } 

    clear = () => {
        this.pendingEvents = []
    }

    /// Modfications
}