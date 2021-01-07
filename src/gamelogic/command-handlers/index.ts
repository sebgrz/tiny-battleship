import { CreateGameCommand } from "../../commons/commands/gamelogic/create-game.command";
import { EventsManager } from "../../commons/event-handler/events-manager";
import { CreateGameCommandHandler } from "./create-game.commandhandler";

export const commandsManager = new EventsManager()
commandsManager.register(CreateGameCommand, CreateGameCommandHandler)