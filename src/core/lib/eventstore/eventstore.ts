import { IEvent } from "@tb/commons";

export interface IEventStore {
    saveEvents: (key: string, events: IEvent[]) => Promise<void>
    getEvents: (key: string) => Promise<IEvent[]>
}