import { IEventStore } from "./eventstore";
import { EventData, EventStoreDBClient, FORWARDS, jsonEvent, ReadRevision, ResolvedEvent, START } from "@eventstore/db-client"
import { IEvent } from "@tb/commons";

export class EventStoreDB implements IEventStore {
    client?: EventStoreDBClient
    keyPrefix = ""

    constructor(connectionString: string, keyPrefix: string) {
        console.log("ES conn: " + connectionString)
        this.client = new EventStoreDBClient({ endpoint: connectionString }, {insecure: true})
        this.keyPrefix = keyPrefix
    }

    saveEvents = async (key: string, events: IEvent[]) => {
        let stream = this.keyPrefix + key
        let dbEnvents: EventData[] = []
        for (let item of events) {
            let e = jsonEvent({
                type: item.type,
                data: item as any
            })
            dbEnvents.push(e)
        }
        await this.client?.appendToStream(stream, dbEnvents)
    }

    getEvents = async (key: string): Promise<IEvent[]> => {
        let stream = this.keyPrefix + key
        let nextPosition: ReadRevision | undefined = START
        let events: IEvent[] = []
        for (; ;) {
            let dbEvents: ResolvedEvent[] | undefined = await this.client?.readStream(stream, 100, { direction: FORWARDS, fromRevision: nextPosition })
            if (!dbEvents || dbEvents.length == 0) {
                break
            }

            for (let e of dbEvents) {
                nextPosition = e.commitPosition
                let ev = e.event?.data as IEvent
                events.push(ev)
            }

            if (!nextPosition) {
                break
            }
        }

        return events
    }
}