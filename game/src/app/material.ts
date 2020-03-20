import {MatToolbarModule} from '@angular/material/toolbar'
import {MatIconModule} from '@angular/material/icon'
import {MatProgressBarModule} from '@angular/material/progress-bar'

import { NgModule } from '@angular/core'


@NgModule({
    imports: [MatToolbarModule, MatIconModule, MatProgressBarModule],
    exports: [MatToolbarModule, MatIconModule, MatProgressBarModule]
})

export class MaterialModule{ }