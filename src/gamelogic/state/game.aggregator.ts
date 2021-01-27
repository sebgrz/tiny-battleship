import { CreateGameCommand, GameCreatedEvent, IEvent, JoinGameCommand, JoinedToGameEvent, LeaveGameCommand, GameOverEvent, GameOverReason, ShotCommand, HitFieldEvent, MishitFieldEvent } from "@tb/commons";
import { GameState } from "./game.state";
import { v4 as uuidv4 } from "uuid"

export class GameAggregator {
    private pendingEvents: IEvent[] = []

    state?: GameState

    replay = (events: IEvent[]) => {
        for (let event of events) {
            switch (event.type) {
                case "GameCreatedEvent": {
                    let ev = event as GameCreatedEvent
                    this.state = {
                        id: ev.gameID,
                        name: ev.name,
                        players: [
                            {
                                connectionId: ev.creatorConnectionId,
                                name: ev.creatorPlayer,
                                isWinner: false,
                                isNextMove: false,
                                board: ev.creatoreBoard!,
                                shipsCount: ev.shipsCount
                            }
                        ]
                    }
                    break
                }
                case "JoinedToGameEvent": {
                    let ev = event as JoinedToGameEvent
                    this.state?.players.push({
                        connectionId: ev.connectionID,
                        name: ev.player,
                        isWinner: false,
                        isNextMove: false,
                        board: ev.board!,
                        shipsCount: ev.shipsCount
                    })
                    break
                }
                case "GameOverEvent": {
                    let ev = event as GameOverEvent
                    let winnerIndex = this.state?.players.findIndex(f => f.connectionId != ev.winnerConnectionID)
                    if (!winnerIndex) {
                        break
                    }
                    this.state!.players[winnerIndex].isWinner = true
                    break
                }
                case "HitFieldEvent":{
                    let ev = event as HitFieldEvent
                    let gotHitIndex = this.state?.players.findIndex(f => f.connectionId != ev.whoGotHitConnectionID)
                    this.state!.players[gotHitIndex!].board[ev.hitPosition!.x][ev.hitPosition!.y] = 3 // 3 - it means hit
                    this.state!.players[gotHitIndex!].shipsCount--
                    break
                }
                default:
                    return
            }
        }
    }

    getPendingEvents = (): IEvent[] => {
        return this.pendingEvents
    }

    clear = () => {
        this.pendingEvents = []
    }

    /// Modfications
    createGame = (command: CreateGameCommand): string => {
        let shipCounter = 0

        // Looking for any ship on a player board
        command.board?.forEach(line => {
            line.forEach(field => {
                if (field == 1) {
                    shipCounter++
                }
            })
        })

        let gameID = uuidv4()
        let event = new GameCreatedEvent()
        event.creatorConnectionId = command.connectionId
        event.creatorPlayer = command.username
        event.creatoreBoard = command.board
        event.gameID = gameID
        event.name = command.gameName
        event.shipsCount = shipCounter

        this.pendingEvents.push(event)
        return gameID
    }

    joinToGame = (command: JoinGameCommand) => {
        let opponent = this.state?.players[0]

        let shipCounter = 0

        // Looking for any ship on a player board
        command.board?.forEach(line => {
            line.forEach(field => {
                if (field == 1) {
                    shipCounter++
                }
            })
        })

        let event = new JoinedToGameEvent()
        event.connectionID = command.connectionId
        event.opponentConnectionID = opponent!.connectionId
        event.gameID = command.gameID
        event.player = command.username
        event.board = command.board
        event.shipsCount = shipCounter

        this.pendingEvents.push(event)
    }

    leaveGame = (command: LeaveGameCommand) => {
        let winner = this.state?.players.filter(f => f.connectionId != command.connectionId)[0]

        let event = new GameOverEvent()
        event.gameID = this.state?.id ?? ""
        event.reason = GameOverReason.Escape
        event.winnerConnectionID = winner?.connectionId ?? ""
        event.loserConnectionID = command.connectionId

        this.pendingEvents.push(event)
    }

    shot = (command: ShotCommand) => {
        let opponent = this.state?.players.filter(f => f.connectionId != command.connectionId)[0]
        let field = opponent!.board[command.position!.x][command.position!.y]

        // 0 - field, 1 - ship, 2 - miss, 3 - hit
        if (field === 1) {
            if (opponent?.shipsCount == 1) { // before of this shot player had only one ship - it means that provide to the end game
                let gameOverEvent = new GameOverEvent()
                gameOverEvent.gameID = this.state?.id ?? ""
                gameOverEvent.reason = GameOverReason.EndGame
                gameOverEvent.winnerConnectionID = command.connectionId
                gameOverEvent.loserConnectionID = opponent.connectionId

                this.pendingEvents.push(gameOverEvent)
                return
            }
            let hitEvent = new HitFieldEvent()
            hitEvent.gameID = this.state!.id
            hitEvent.whoShotConnectionID = command.connectionId
            hitEvent.whoGotHitConnectionID = opponent!.connectionId
            hitEvent.hitPosition = {
                x: command.position!.x,
                y: command.position!.y
            }
            this.pendingEvents.push(hitEvent)
        } else {
            let mishitEvent = new MishitFieldEvent()
            mishitEvent.gameID = this.state!.id
            mishitEvent.whoShotConnectionID = command.connectionId
            mishitEvent.whoGotMishitConnectionID = opponent!.connectionId
            mishitEvent.mishitPosition = {
                x: command.position!.x,
                y: command.position!.y
            }
            this.pendingEvents.push(mishitEvent)
        }
    }
}