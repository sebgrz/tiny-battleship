import { IEvent } from "../../commons"

export class MishitFieldEvent implements IEvent {
    type = "MishitFieldEvent"
    gameID: string = ""
    whoShotConnectionID: string = "";
    whoGotMishitConnectionID: string = "";
    mishitPosition?: {x: number, y:number}
}