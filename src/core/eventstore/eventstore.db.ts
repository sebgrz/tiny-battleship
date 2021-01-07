import { IEvent } from "../../commons/event-handler/event";
import { IEventStore } from "./eventstore";

export class EventStoreDB implements IEventStore {
    constructor(connectionString: string) {
        
    }

    saveEvents = async (key: string, events: IEvent[]) => {

    }

    getEvents = async (key: string) => {
        return [] 
    }

}