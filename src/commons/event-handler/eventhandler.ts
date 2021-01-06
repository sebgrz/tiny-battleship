export interface IEventHandler<T> {
    execute: (command: T) => Promise<void>
}