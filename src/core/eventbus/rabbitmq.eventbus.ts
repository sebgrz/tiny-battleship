import { IEvent } from "../../commons/event-handler/event";
import { IEventBus } from "./eventbus";
import amqp from "amqplib";

export class RabbitMQEventBus implements IEventBus {
    constructor(private endpoint: string, private exchange: string, private queue?: string) {
    }

    consume = async (callback: (ev: IEvent) => Promise<void>) => {
        let connection = await amqp.connect(this.endpoint)
        let channel = await connection.createChannel()

        await channel.assertExchange(this.exchange, "fanout", { durable: true, autoDelete: false })
        await channel.assertQueue(this.queue!, { durable: false, autoDelete: false, exclusive: false })
        await channel.bindQueue(this.queue!, this.exchange, "")

        channel.consume(this.queue!, async msg => {
            try {
                let ev = JSON.parse(msg?.content.toString() ?? "") as IEvent
                await callback(ev)
            } finally {
                channel.ack(msg!, true)
            }
        })
    }

    send = async (ev: IEvent) => {
        // TODO:
    }

}