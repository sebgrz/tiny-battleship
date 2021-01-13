import { IEvent } from "../../event-handler/event"

export class CreateGameCommand implements IEvent {
    type = "CreateGameCommand"
    username: string = ""
    connectionId: string = ""
    gameName: string = ""
    board?: number[][]
}