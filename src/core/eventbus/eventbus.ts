import { IEvent } from "../../commons/event-handler/event";

export interface IEventBus extends IEventBusConsumer, IEventBusSender {
}

export interface IEventBusConsumer {
    consume: (callback: (ev: IEvent) => Promise<void>) => Promise<void>
}

export interface IEventBusSender {
    send: (ev: IEvent) => Promise<void>
}