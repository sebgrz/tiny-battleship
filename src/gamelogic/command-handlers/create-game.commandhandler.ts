import { IEventHandler } from "../../commons/event-handler/eventhandler"
import { CreateGameCommand } from "../../commons/commands/gamelogic/create-game.command"

export class CreateGameCommandHandler implements IEventHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {

    }
}