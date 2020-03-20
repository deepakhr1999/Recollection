import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar'
import {MatInputModule} from '@angular/material/input'

import { NgModule } from '@angular/core'


@NgModule({
    imports: [MatToolbarModule, MatIconModule, MatProgressBarModule, MatInputModule],
    exports: [MatToolbarModule, MatIconModule, MatProgressBarModule, MatInputModule]
})

export class MaterialModule{ }