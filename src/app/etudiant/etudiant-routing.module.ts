import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantProfilComponent } from '../etudiant-profil/etudiant-profil.component';
import { CoursReplyComponent } from './cours-reply/cours-reply.component';
import { CoursComponent } from './cours/cours.component';
import { EtudiantMessageComponent } from './etudiant-message/etudiant-message.component';
import { EtudiantComponent } from './etudiant.component';
import { ExamenComponent } from './examen/examen.component';

const routes: Routes = [
  { path: '', component: EtudiantComponent,children:[
    {path:'',redirectTo:'Cours',pathMatch:'full'},
    {path:'Cours',component:CoursComponent, data:{depth:'2'}},
    {path:'Cours/Reply',component:CoursReplyComponent,data:{depth:'3'}},
    {path:'Message',component:EtudiantMessageComponent,data:{depth:'4'}},
    {path:'Examen',component:ExamenComponent,data:{depth:'3'}},
    {path:'Profil',component:EtudiantProfilComponent,data:{depth:'1'}},
  ] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
