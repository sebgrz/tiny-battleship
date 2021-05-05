import express, { Response } from "express"
import { CreateGameCommand, JoinGameCommand, LeaveGameCommand, ShotCommand } from "@tb/commons"
import { gateway } from ".."
import { GetGameRequest } from "@tb/protos-gen/games_pb"

const createGameHandler = async (req: express.Request, res: Response) => {
    let command = Object.assign(new CreateGameCommand(), req.body)
    await gateway.producerEventBus.send(command)

    console.log(`create game\n${JSON.stringify(command)}`)
    res.sendStatus(200)
}

const joinGameHandler = async (req: express.Request, res: Response) => {
    let command = Object.assign(new JoinGameCommand, req.body)
    await gateway.producerEventBus.send(command)

    console.log(`join game\n${JSON.stringify(command)}`)
    res.sendStatus(200)
}

const leaveGameHandler = async (req: express.Request, res: Response) => {
    let gameID = req.params["gameId"]
    let connectionId = req.params["connectionId"]

    let command = Object.assign(new LeaveGameCommand(), { gameID, connectionId })
    await gateway.producerEventBus.send(command)

    console.log(`leave game\n${JSON.stringify(command)}`)
    res.sendStatus(200)
}
const shotHandler = async (req: express.Request, res: Response) => {
    let gameID = req.params["gameId"]
    let connectionId = req.params["connectionId"]
    let x = req.params["x"]
    let y = req.params["y"]

    let command = Object.assign(new ShotCommand(), { gameID, connectionId, x, y})
    await gateway.producerEventBus.send(command)

    console.log(`shot\n${JSON.stringify(command)}`)
    res.sendStatus(200)
}
const getGame = async (req: express.Request, res: Response) => {
    let gameID = req.params["gameId"]
    let connectionId = req.params["connectionId"]

    let getGameReq = new GetGameRequest()
    getGameReq.setGameid(gameID)
    getGameReq.setPlayerconnectionid(connectionId)

    gateway.gamesServiceClient.getGame(getGameReq, (e, r) => {
        console.error("unimplemented")    
    })
    
    res.sendStatus(200)
}

export const handlers = {
    createGameHandler,
    joinGameHandler,
    leaveGameHandler,
    shotHandler
}

