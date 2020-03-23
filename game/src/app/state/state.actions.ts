import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store'

// client state implements this interface
import { AppState } from './state.model'
import { Creds } from './state.util'

export const CONNECT = 'ConnectAction'
export const PING = 'Ping'
export const PLAY = 'Play'
export const CALL = 'Call'
export const END = "End"

/* ===================== Action Section ===================== */
/* Every action must implement the Action interface */

// user tries to connect to server
export class ConnectAction implements Action {
    readonly type = CONNECT

    constructor(public payload: Creds) {}
}

// user pings the server to seek any changes
export class PingAction implements Action {
    readonly type = PING

    constructor(public payload: AppState) {}
}

// user asks a card from opponent
export class PlayAction implements Action {
    readonly type = PLAY

    constructor(public payload: AppState) {}
}

// user calls a set from opponent
export class CallAction implements Action {
    readonly type = CALL

    constructor(public payload: AppState) {}
}

export class GameEndAction implements Action {
    readonly type = END

    constructor(public payload: AppState) {}
}
/* All actions above this */


/* ============================ Union Section ============================ */
// union type of all the actions
export type Actions = ConnectAction | 
                         PingAction |
                         PlayAction |
                         CallAction |
                        GameEndAction