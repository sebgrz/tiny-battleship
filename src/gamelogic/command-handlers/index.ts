import { CreateGameCommand, EventsManager } from "@tb/commons";
import { CreateGameCommandHandler } from "./create-game.commandhandler";

export const commandsManager = new EventsManager()
commandsManager.register(CreateGameCommand, CreateGameCommandHandler)