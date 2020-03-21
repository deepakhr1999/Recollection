import { Action } from '@ngrx/store'
import { AppState, defaultState } from './state.model'
import * as StateActions from './state.actions'


/*
    takes current state as input and returns next state as output
 */
export function reducer(state: AppState = defaultState, action: StateActions.Actions): AppState {
    switch(action.type){
        case StateActions.CONNECT:
            return state
        default:
            return state
    }
    
}
