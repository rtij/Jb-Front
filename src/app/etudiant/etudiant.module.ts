import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EtudiantRoutingModule } from './etudiant-routing.module';
import { EtudiantComponent } from './etudiant.component';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantMessageComponent } from './etudiant-message/etudiant-message.component';
import { ExamenComponent } from './examen/examen.component';
import { RattrapageComponent } from './rattrapage/rattrapage.component';
import { CoursComponent } from './cours/cours.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoursDetailsComponent } from './cours-details/cours-details.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CoursReplyComponent } from './cours-reply/cours-reply.component';
import { ExamPComponent } from './exam-p/exam-p.component';
import { EtudiantProfilComponent } from '../etudiant-profil/etudiant-profil.component';


@NgModule({
  declarations: [
    EtudiantComponent,
    EtudiantListComponent,
    EtudiantMessageComponent,
    ExamenComponent,
    RattrapageComponent,
    CoursComponent,
    CoursDetailsComponent,
    CoursReplyComponent,
    ExamPComponent,
    EtudiantProfilComponent
  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    EtudiantRoutingModule,
    
  ]
})
export class EtudiantModule { }
