import { IEventHandler, JoinGameCommand, LeaveGameCommand } from "@tb/commons"
import { gameLogic } from ".."
import { GameAggregator } from "../state/game.aggregator"

export class LeaveGameCommandHandler implements IEventHandler<LeaveGameCommand> {
    execute = async (command: LeaveGameCommand) => {
        let events = await gameLogic.eventStore.getEvents(command.gameID)
        let aggr = new GameAggregator()
        aggr.replay(events)

        aggr.leaveGame(command)
        await gameLogic.eventStore.saveEvents(command.gameID, aggr.getPendingEvents())
        // TODO:  push to service bus
    }
}