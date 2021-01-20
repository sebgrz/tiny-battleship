import { CreateGameCommand, GameCreatedEvent, IEvent } from "@tb/commons";
import { GameState } from "./game.state";
import { v4 as uuidv4 } from "uuid"

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
    createGame = (command: CreateGameCommand): string => {
        let gameID = uuidv4()
        let event = new GameCreatedEvent()
        event.creatorConnectionId = command.connectionId
        event.creatorPlayer = command.username
        event.creatoreBoard = command.board
        event.gameID = gameID
        event.name = command.gameName

        this.pendingEvents.push(event)
        return gameID
    }
}