import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExamReponse } from '../Object/ExamReponse';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { CoursReplyComponent } from './cours-reply/cours-reply.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EtuComponent } from './etu/etu.component';
import { ExamReponseComponent } from './exam-reponse/exam-reponse.component';
import { ExamenAddComponent } from './examen-add/examen-add.component';
import { ExamenEtudiantListComponent } from './examen-etudiant-list/examen-etudiant-list.component';
import { ExamenComponent } from './examen/examen.component';
import { MessageEnvComponent } from './message-env/message-env.component';
import { MessageRComponent } from './message-r/message-r.component';
import { MessageComponent } from './message/message.component';
import { ProfAccComponent } from './prof-acc/prof-acc.component';
import { ProfComponent } from './prof.component';
import { ProfileComponent } from './profile/profile.component';
import { RetourComponent } from './retour/retour.component';

const routes: Routes = [
  {
    path: '', component: ProfComponent, children: [
      { path: '', redirectTo: 'cours', pathMatch: 'full' },
      { path: 'cours', component: ProfAccComponent },
      { path: 'cours/cours-ajout', component: CoursAddComponent },
      { path: 'Message', component: MessageComponent ,children:[
        {path:'',redirectTo:'Recu',pathMatch:'full'},
        {path:'Recu',component:MessageRComponent},
        {path:'Envoye',component:MessageEnvComponent}
      ]},
      { path: 'Retour', component: RetourComponent },
      { path: 'Etudiant', component: EtuComponent },
      { path: 'Enseignant', component: EnseignantComponent },
      { path: 'Profil', component: ProfileComponent },
      { path: 'Examen', component: ExamenComponent },
      { path: 'Examen/Examen-add', component: ExamenAddComponent },
      { path: 'Examen/ListeParticipant', component: ExamenEtudiantListComponent },
      { path: 'Examen/Reponse', component: ExamReponseComponent },
      {path:'cours/cours-reply-list',component:CoursReplyComponent},
      {path:'cours/Reponse',component:RetourComponent}
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }
