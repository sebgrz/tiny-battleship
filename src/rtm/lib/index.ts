import expressApp from 'express'
import socket from "socket.io"
import http from "http"
import { ClientsState } from './state'
import { RabbitMQEventBus, IEventBusConsumer } from "@tb/core"
import env from "dotenv"
import { eventsManager } from './eventhandlers'

env.config({ path: "../.env" })

const PORT = process.env.RTM_SVC_WS_PORT as string
const rtm = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_RTM_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager,
    clients: {} as ClientsState
}

let srv = new http.Server(expressApp)
let io = new socket.Server(srv)

io.on("connection", c => {

    c.on("disconnect", d => {

    })
})

srv.listen(PORT, () => {
    console.log(`realtime service is listening on ${PORT} port`)
})


let startMq = async () => {
    console.log("start events bus consumer...")
    await rtm.consumerEventBus.consume(async ev => {
        await rtm.eventsManager.execute(ev)
    })
}

startMq()