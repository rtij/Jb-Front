import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfRoutingModule } from './prof-routing.module';
import { ProfComponent } from './prof.component';
import { ProfAccComponent } from './prof-acc/prof-acc.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { EtuComponent } from './etu/etu.component';
import { MessageComponent } from './message/message.component';
import { RetourComponent } from './retour/retour.component';
import { ProfileComponent } from './profile/profile.component';
import { ExamenComponent } from './examen/examen.component';
import { EncadrementComponent } from './encadrement/encadrement.component';
import { ExamenAddComponent } from './examen-add/examen-add.component';
import { EnseignantComponent } from './enseignant/enseignant.component';


@NgModule({
  declarations: [
    ProfComponent,
    ProfAccComponent,
    CoursAddComponent,
    EtuComponent,
    MessageComponent,
    RetourComponent,
    ProfileComponent,
    ExamenComponent,
    EncadrementComponent,
    ExamenAddComponent,
    EnseignantComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    ReactiveFormsModule,
    ProfRoutingModule
  ]
})
export class ProfModule { }
