import { IEvent } from "../../event-handler/event"

export class JoinGameCommand implements IEvent {
    type = "JoinGameCommand"
    gameID: string = ""
    username: string = ""
    connectionId: string = ""
    board?: number[][]
}