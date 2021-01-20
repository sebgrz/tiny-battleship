import { CreateGameCommand, GameCreatedEvent, IEvent, JoinGameCommand, JoinedToGameEvent } from "@tb/commons";
import { GameState } from "./game.state";
import { v4 as uuidv4 } from "uuid"
import { commandsManager } from "../command-handlers";

export class GameAggregator {
    private pendingEvents: IEvent[] = []

    state?: GameState

    replay = (events: IEvent[]) => {
        // TODO: to implement
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

    joinToGame = (command: JoinGameCommand) => {
        let event = new JoinedToGameEvent()
        event.connectionId = command.connectionId
        event.gameID = command.gameID
        event.player = command.username
        event.board = command.board

        this.pendingEvents.push(event)
    }
}