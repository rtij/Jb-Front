import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfRoutingModule } from './prof-routing.module';
import { ProfComponent } from './prof.component';
import { ProfAccComponent } from './prof-acc/prof-acc.component';


@NgModule({
  declarations: [
    ProfComponent,
    ProfAccComponent
  ],
  imports: [
    CommonModule,
    ProfRoutingModule
  ]
})
export class ProfModule { }
