import { IEvent } from "../../commons"

export class JoinedToGameEvent implements IEvent {
    type = "JoinedToGameEvent"
    gameID: string = ""
    player: string = ""
    connectionID: string = ""
    opponentConnectionID: string = ""
    board?: number[][]
}