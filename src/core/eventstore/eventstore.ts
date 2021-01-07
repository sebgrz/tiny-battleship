import { IEvent } from "../../commons/event-handler/event";

export interface IEventStore {
    saveEvents: (key: string, events: IEvent[]) => Promise<void>
    getEvents: (key: string) => Promise<IEvent[]>
}