import { Component, OnInit, Input } from '@angular/core'

// for passing around states
import { Observable } from 'rxjs'
import { Store } from '@ngrx/store'

// the state that will be passed around
import { AppState, defaultState } from '../state/state.model'
import { Deck } from '../state/state.util'

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  name    : Observable<string>
  server  : Observable<string>
  deck    : Observable<Deck>
  score   : Observable<[number, number]>
  selected: Observable<number>

  constructor(private store: Store< {layout: AppState} >) { 
    this.name = store.select(x => x.layout.creds.name)
    this.server = store.select(x => x.layout.creds.server)
    this.deck = store.select(x => x.layout.gameState.deck)
    this.score  = store.select(x => x.layout.gameState.score)
    this.selected = store.select(x => x.layout.gameState.selected)
  }

  ngOnInit(): void {
    
  }
}
