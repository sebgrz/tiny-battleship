import { CreateGameCommand, IEventHandler } from "@tb/commons";
import { gameLogic } from ".."
import { GameAggregator } from "../state/game.aggregator";

export class CreateGameCommandHandler implements IEventHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {
        let aggr = new GameAggregator()
        let gameID = aggr.createGame(command)

        await gameLogic.eventStore.saveEvents(gameID, aggr.getPendingEvents())

        // TODO:  push to service bus
    }
}