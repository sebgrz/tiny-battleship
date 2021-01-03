import {ICommand} from "../command"

export class CreateGameCommand implements ICommand {
    type = "CreateGameCommand"
    username: string = ""
    connectionId: string = ""
    gameName: string = ""
    board?:number[][] 
}