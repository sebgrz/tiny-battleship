export type GamesState = {
    games: { [key: string]: Game }
}

export type Game = {
    id: string,
    name: string,
    players: Player[]
}

export type Player = {
    connectionID: string,
    username: string
    board: number[][]
}