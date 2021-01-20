import { CreateGameCommand, GameCreatedEvent, IEventHandler } from "@tb/commons";
import { v4 as uuidv4 } from "uuid"
import { gameLogic } from ".."

export class CreateGameCommandHandler implements IEventHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {
        let gameID = uuidv4()
        let event = new GameCreatedEvent()
        event.creatorConnectionId = command.connectionId
        event.creatorPlayer = command.username
        event.creatoreBoard = command.board
        event.gameID = gameID
        event.name = command.gameName

        await gameLogic.eventStore.saveEvents(gameID, [event])

        // TODO:  push to service bus
    }
}