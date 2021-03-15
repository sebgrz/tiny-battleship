import { Socket } from "socket.io";

export type ClientsState = {
    clients: {[key: string]: Socket}
} 