import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantMessageComponent } from './etudiant-message/etudiant-message.component';


@NgModule({
  declarations: [
    EtudiantComponent,
    EtudiantListComponent,
    EtudiantMessageComponent
  ],
  imports: [
    CommonModule,
    EtudiantRoutingModule
  ]
})
export class EtudiantModule { }
