import { IEventHandler } from "../../commons/event-handler/eventhandler"
import { CreateGameCommand } from "../../commons/commands/gamelogic/create-game.command"
import { v4 as uuidv4 } from "uuid"
import { GameCreatedEvent } from "../../commons/events/gamelogic/game-created.event"
import { gameLogic } from ".."

export class CreateGameCommandHandler implements IEventHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {
        let gameID = uuidv4()
        let event = new GameCreatedEvent()
        event.creatorConnectionId = command.connectionId
        event.creatorPlayer = command.username
        event.creatoreBoard = command.board
        event.gameID = gameID

        await gameLogic.eventStore.saveEvents(gameID, [event])
                
        // TODO:  push to service bus
    }   
}