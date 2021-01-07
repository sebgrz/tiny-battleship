import { CreateGameCommand } from "../commons/commands/gamelogic/create-game.command"
import { EventsManager } from "../commons/event-handler/events-manager"
import { CreateGameCommandHandler } from "./command-handlers/create-game.commandhandler"

let commandsManager = new EventsManager()
commandsManager.register(CreateGameCommand, CreateGameCommandHandler)