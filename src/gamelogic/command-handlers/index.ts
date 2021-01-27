import { CreateGameCommand, EventsManager, JoinGameCommand, LeaveGameCommand, ShotCommand } from "@tb/commons";
import { CreateGameCommandHandler } from "./create-game.commandhandler";
import { JoinGameCommandHandler } from "./join-game.commandhandler";
import { LeaveGameCommandHandler } from "./leave-game.commandhandler";
import { ShotCommandHandler } from "./shot.commandhandler";

export const commandsManager = new EventsManager()
commandsManager.register(CreateGameCommand, CreateGameCommandHandler)
commandsManager.register(JoinGameCommand, JoinGameCommandHandler)
commandsManager.register(LeaveGameCommand, LeaveGameCommandHandler)
commandsManager.register(ShotCommand, ShotCommandHandler)