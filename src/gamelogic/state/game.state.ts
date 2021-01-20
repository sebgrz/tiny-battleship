 export type GameState = {
     id: string
     name: string
     players: Player[]
 } 

 export type Player ={
     connectionId: string
     name: string
     isNextMove: boolean
     isWinner: boolean
     shipsCount: number // 0 - end game, loser
     board: number[][] // 0 - field, 1 - ship, 2 - miss, 3 - hit
 }