import { Action } from '@ngrx/store'
import { AppState, defaultState } from './state.model'
import * as StateActions from './state.actions'


/*
    takes current state as input and returns next state as output
 */
export function reducer(state: AppState = defaultState, action: StateActions.Actions): AppState {
    switch(action.type){
        case StateActions.CONNECT: 
            // when you connect, we only update the credentials
            return {...state, creds: action.payload}
        case StateActions.PING:
            // then when you ping, we update the gamestate
            return {...state, gameState: action.payload.gameState}
        default:
            return state
    }
    
}
