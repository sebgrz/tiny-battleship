export type GamesState = {
    games: Game[]
}

export type Game = {
    id: string,
    name: string,
    isOpen: boolean
}