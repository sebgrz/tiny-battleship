import { ICommandHandler } from "../../commons/commands/commandhandler"
import {CreateGameCommand} from "../../commons/commands/gamelogic/create-game.command"

export class CreateGameCommandHandler implements ICommandHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {
        
    }
}