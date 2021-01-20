import { IEventHandler, JoinGameCommand } from "@tb/commons"
import { gameLogic } from ".."
import { GameAggregator } from "../state/game.aggregator"

export class JoinGameCommandHandler implements IEventHandler<JoinGameCommand> {
    execute = async (command: JoinGameCommand) => {
        let events = await gameLogic.eventStore.getEvents(command.gameID)
        let aggr = new GameAggregator()
        aggr.replay(events)

        if ((aggr.state?.players.length ?? 0) != 1) {
            // TODO: send event GameJoinFailed
            return
        }
        aggr.joinToGame(command)
        await gameLogic.eventStore.saveEvents(command.gameID, aggr.getPendingEvents())
        // TODO:  push to service bus
    }
}