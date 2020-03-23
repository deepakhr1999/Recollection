import { BrowserModule } from '@angular/platform-browser'
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { MDBBootstrapModule } from 'angular-bootstrap-md'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'

// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from './material'
import { HomeComponent } from './home/home.component'
import { GameComponent } from './game/game.component'

import { StoreModule, ActionReducerMap } from '@ngrx/store'
import { reducer } from './state/state.reducer'
import { AppState } from './state/state.model';
import { CredentialsComponent } from './credentials/credentials.component';
import { DeckComponent } from './deck/deck.component';
import { StatsComponent } from './stats/stats.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GameComponent,
    CredentialsComponent,
    DeckComponent,
    StatsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MDBBootstrapModule.forRoot() ,
    StoreModule.forRoot({
      layout: reducer
    })
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
