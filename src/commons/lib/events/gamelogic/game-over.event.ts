import { IEvent } from "../../commons"

export class GameOverEvent implements IEvent {
    type = "GameOverEvent"
    gameID: string = ""
    winnerConnectionID: string = ""
    loserConnectionID: string = ""
    reason: GameOverReason = GameOverReason.Unknown
}

export enum GameOverReason {
    Unknown = 0,
    EndGame = 1,
    Escape = 2
}