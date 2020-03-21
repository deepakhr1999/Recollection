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