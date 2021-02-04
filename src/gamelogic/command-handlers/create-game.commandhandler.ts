import { CreateGameCommand, IEventHandler } from "@tb/commons";
import { gameLogic } from ".."
import { GameAggregator } from "../state/game.aggregator";

export class CreateGameCommandHandler implements IEventHandler<CreateGameCommand> {
    execute = async (command: CreateGameCommand) => {
        let aggr = new GameAggregator()
        let gameID = aggr.createGame(command)

        let events = aggr.getPendingEvents()
        await gameLogic.eventStore.saveEvents(gameID, events)

        events.forEach(async e => gameLogic.producerEventBus.send(e))
    }
}