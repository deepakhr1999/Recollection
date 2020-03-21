import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})


export class GameComponent implements OnInit {
  name = "Deepak"
  server = "localhost"
  cards = [
      [
        {suit: 'heart', rank: 'J'},
        {suit: 'heart', rank: 'Q'},
        {suit: 'heart', rank: 'K'}
      ],
      [
        {suit: 'diamond', rank: 'A'},
        {suit: 'diamond', rank: '2'},
        {suit: 'diamond', rank: '3'}
      ],
      [
        {suit: 'spades', rank: 'A'},
        {suit: 'spades', rank: '6'},
        {suit: 'spades', rank: '7'}
      ],
      [
        {suit: 'clubs', rank: '4'},
        {suit: 'clubs', rank: '5'},
        {suit: 'clubs', rank: '6'}
      ],
    ]

  constructor() {
  }

  ngOnInit(): void {
    
  }
}
