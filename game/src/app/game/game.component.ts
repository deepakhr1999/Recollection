import { Component, OnInit } from '@angular/core'

// for passing around states
import { Observable } from 'rxjs'
import { Store, select } from '@ngrx/store'

// the state that will be passed around
import { AppState } from '../state/state.model'
import { Deck } from '../state/util'

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
    this.name = store.select(x => x.layout.name)
    this.server = store.select(x => x.layout.server)
    this.deck = store.select(x => x.layout.deck)
    this.score  = store.select(x => x.layout.score)
    this.selected = store.select(x => x.layout.selected)
    // store.select(x => x.layout).subscribe(x => console.log(x))
  }

  ngOnInit(): void {
    
  }
}
