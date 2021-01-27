import { IEventHandler, ShotCommand } from "@tb/commons"
import { gameLogic } from ".."
import { GameAggregator } from "../state/game.aggregator"

export class ShotCommandHandler implements IEventHandler<ShotCommand> {
    execute = async (command: ShotCommand) => {
        let events = await gameLogic.eventStore.getEvents(command.gameID)
        let aggr = new GameAggregator()
        aggr.replay(events)
        aggr.shot(command)

        await gameLogic.eventStore.saveEvents(command.gameID, aggr.getPendingEvents())
        // TODO:  push to service bus
    }
}