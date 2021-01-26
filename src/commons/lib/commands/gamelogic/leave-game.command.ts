import { IEvent } from "../../commons"

export class LeaveGameCommand implements IEvent {
    type = "LeaveGameCommand"
    gameID: string = ""
    connectionId: string = ""
}