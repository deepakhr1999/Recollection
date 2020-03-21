import { Deck, Card, Suit } from './util'

export interface AppState {
    readonly name: string
    readonly server: string
    readonly deck: Deck 
    readonly score: [number, number] // my wins vs opponent's wins
    readonly selected: number
}
const hearts = new Suit(
    [
        new Card('hearts', 'A'),
        new Card('hearts', '2'),
        new Card('hearts', '6'),
    ],
    [
        new Card('hearts', '8'),
        new Card('hearts', '9')
    ], 
    false,
    false
)
const spades = hearts
const diamonds = hearts
const clubs = hearts

export const defaultState: AppState = {
    name : "Deepak",
    server : "localhost",
    deck: new Deck(hearts, diamonds, spades, clubs),
    score: [0, 0],
    selected: 1
}