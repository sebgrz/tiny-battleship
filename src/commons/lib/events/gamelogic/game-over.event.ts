import { IEvent } from "../../commons"

export class GameOverEvent implements IEvent {
    type = "GameOverEvent"
    gameID: string = ""
    winnerID: string = ""
    reason: GameOverReason = GameOverReason.Unknown
}

export enum GameOverReason {
    Unknown = 0,
    EndGame = 1,
    Escape = 2
}