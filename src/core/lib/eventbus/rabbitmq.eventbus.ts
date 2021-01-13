import { IEventBus } from "./eventbus";
import amqp from "amqplib";
import { IEvent } from "@tb/commons";

export class RabbitMQEventBus implements IEventBus {
    private producerChannel?: amqp.Channel

    constructor(private endpoint: string, private exchange: string, private queue?: string) {
        let init = async () => {
            if (!queue) {
                let connection = await amqp.connect(this.endpoint)
                this.producerChannel = await connection.createChannel()
            }
        }
        init()
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
        if (this.producerChannel) {
            await this.producerChannel.assertExchange(this.exchange, "fanout", { durable: true, autoDelete: false })
            this.producerChannel.publish(this.exchange, "", Buffer.from(JSON.stringify(ev)))
        }
    }

}