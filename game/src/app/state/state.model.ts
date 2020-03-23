import { Deck, Card, Suit, Creds, GameState } from './state.util'

export interface AppState {
    readonly creds: Creds
    readonly gameState: GameState
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
    creds : new Creds(
                "Deepak",
                "localhost",
                "Harvey Spectre",
                ["Mike Ross", "Rachel Zane"]
            ),
    gameState : new GameState(
        new Deck(hearts, diamonds, spades, clubs),
        [0, 0],
        0,
        "Deepak"
    )
}