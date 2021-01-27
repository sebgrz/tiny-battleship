import { IEvent } from "../../event-handler/event"

export class ShotCommand implements IEvent {
    type = "ShotCommand"
    gameID: string = ""
    connectionId: string = ""
    position?: {x: number, y: number}
}