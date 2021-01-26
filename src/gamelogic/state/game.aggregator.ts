import { CreateGameCommand, GameCreatedEvent, IEvent, JoinGameCommand, JoinedToGameEvent, LeaveGameCommand, GameOverEvent, GameOverReason } from "@tb/commons";
import { GameState } from "./game.state";
import { v4 as uuidv4 } from "uuid"

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

    leaveGame = (command: LeaveGameCommand) => {
        let winner = this.state?.players.filter(f => f.connectionId != command.connectionId)[0]

        let event = new GameOverEvent()
        event.gameID = this.state?.id ?? ""
        event.reason = GameOverReason.Escape
        event.winnerID = winner?.connectionId ?? ""

        this.pendingEvents.push(event)
    }
}