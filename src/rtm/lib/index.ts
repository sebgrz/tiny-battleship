import expressApp from 'express'
import socket from "socket.io"
import http from "http"
import { ClientsState } from './state'
import { RabbitMQEventBus, IEventBusConsumer } from "@tb/core"
import env from "dotenv"
import { eventsManager } from './eventhandlers'

env.config({ path: "../.env" })

const PORT = process.env.RTM_SVC_WS_PORT as string
const srv = new http.Server(expressApp)
const io = new socket.Server(srv)
export const rtm = {
    consumerEventBus: new RabbitMQEventBus(
        process.env.RABBITMQ_ENDPOINT as string,
        process.env.RABBITMQ_GAMESLOGIC_EVENTS_EXCHANGE as string,
        process.env.RABBITMQ_RTM_QUEUE as string) as IEventBusConsumer,
    eventsManager: eventsManager,
    clients: { clients: {} } as ClientsState,

}

io.on("connection", c => {
    rtm.clients.clients[c.id] = c

    c.on("disconnect", d => {

    })
})

srv.listen(PORT, () => {
    console.log(`realtime service is listening on ${PORT} port`)
})


let startMq = async () => {
    console.log("start events bus consumer...")
    await rtm.consumerEventBus.consume(async ev => {
        try {
            await rtm.eventsManager.execute(ev)
        } catch (err) {
            console.error(`cannot recognize event ${ev.type}`)
        }

    })
}

startMq()