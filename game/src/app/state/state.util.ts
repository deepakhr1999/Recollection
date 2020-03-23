export class Deck{
    constructor(
        public hearts : Suit,
        public diamonds: Suit,
        public spades: Suit,
        public clubs: Suit
    ){ }
}

export class Suit {
    constructor(
        public lower: Card[],
        public upper: Card[], 
        public hasWonLower: boolean,
        public hasWonUpper: boolean
    ){ }
}

export class Card {
    constructor(
        public suit:string, 
        public rank:string
    ){ }
}

// Aggregates name and server
export class Creds {
    constructor(
        public name: string,
        public server: string,
        public ally: string, 
        public opponents: [string, string]
    ){}
}

export class GameState {
    constructor(
        public deck: Deck,
        public score: [number, number], // my wins vs opponent's wins
        public selected: number,
        public turn: string
    ){}
}