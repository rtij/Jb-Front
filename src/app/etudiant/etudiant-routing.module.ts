import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantProfilComponent } from '../etudiant-profil/etudiant-profil.component';
import { CoursReplyComponent } from './cours-reply/cours-reply.component';
import { CoursComponent } from './cours/cours.component';
import { EtudiantMessageComponent } from './etudiant-message/etudiant-message.component';
import { EtudiantComponent } from './etudiant.component';
import { ExamPComponent } from './exam-p/exam-p.component';
import { ExamenComponent } from './examen/examen.component';
import { MessageEnvComponent } from './message-env/message-env.component';
import { MessageRComponent } from './message-r/message-r.component';

const routes: Routes = [
  {
    path: '', component: EtudiantComponent, children: [
      { path: '', redirectTo: 'Cours', pathMatch: 'full' },
      { path: 'Cours', component: CoursComponent, data: { depth: '2' } },
      { path: 'Cours/Reply', component: CoursReplyComponent, data: { depth: '2' } },
      {
        path: 'Message', component: EtudiantMessageComponent,
        children: [
          {path:'',redirectTo:'Envoye', pathMatch:'full'},
          {path:'Envoye',component:MessageEnvComponent},
          {path:'Recu',component:MessageRComponent}
        ],

        data: { depth: '4' }
      },
      { path: 'Examen', component: ExamenComponent, data: { depth: '3' } },
      { path: 'Examen/Reply', component: ExamPComponent, data: { depth: '3' } },
      { path: 'Profil', component: EtudiantProfilComponent, data: { depth: '1' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
