import express from "express"
import env from "dotenv"
import bodyParser from "body-parser"
import { handlers } from "./handlers"
import { IEventBusSender, RabbitMQEventBus } from "@tb/core"

env.config({path: "../.env"})

export const gateway = {
    producerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMES_EXCHANGE as string
    ) as IEventBusSender
}

const PORT = process.env.GATEWAY_PORT as string
const app = express()
app.use(bodyParser.json());

app.post("/create-game", handlers.createGameHandler)
app.post("/join-game", handlers.joinGameHandler)
app.get("/leave-game/:gameId/:connectionId", handlers.leaveGameHandler)
app.get("/shot/:gameId/:connectionId/:x/:y", handlers.shotHandler)

app.listen(PORT, () => {
    console.log(`gateway api is listening on ${PORT} port`)
})