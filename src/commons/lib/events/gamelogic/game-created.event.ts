import { IEvent } from "../../event-handler/event"

export class GameCreatedEvent implements IEvent {
    type = "GameCreatedEvent"
    gameID: string = ""
    creatorPlayer: string = ""
    creatorConnectionId: string = ""
    name: string = ""
    creatoreBoard?: number[][]
    shipsCount: number = 0
}