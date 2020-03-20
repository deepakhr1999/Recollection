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

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    MDBBootstrapModule.forRoot() 
  ],
  schemas: [ NO_ERRORS_SCHEMA ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
