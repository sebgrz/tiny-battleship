import { IEvent } from "../../commons"

export class HitFieldEvent implements IEvent {
    type = "HitFieldEvent"
    gameID: string = ""
    whoShotConnectionID: string = "";
    whoGotHitConnectionID: string = "";
    hitPosition?: {x: number, y:number}
}