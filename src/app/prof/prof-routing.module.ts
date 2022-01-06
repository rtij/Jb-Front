import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoursAddComponent } from './cours-add/cours-add.component';
import { EnseignantComponent } from './enseignant/enseignant.component';
import { EtuComponent } from './etu/etu.component';
import { ExamenAddComponent } from './examen-add/examen-add.component';
import { ExamenComponent } from './examen/examen.component';
import { MessageComponent } from './message/message.component';
import { ProfAccComponent } from './prof-acc/prof-acc.component';
import { ProfComponent } from './prof.component';
import { ProfileComponent } from './profile/profile.component';
import { RetourComponent } from './retour/retour.component';

const routes: Routes = [
  {path: '', component: ProfComponent,children:[
    {path:'',redirectTo:'cours',pathMatch:'full'},
    {path:'cours',component:ProfAccComponent},
    {path:'cours/cours-ajout',component:CoursAddComponent},
    {path:'Message',component:MessageComponent},
    {path:'Retour',component:RetourComponent},
    {path:'Etudiant',component:EtuComponent},
    {path:'Enseignant',component:EnseignantComponent},
    {path:'Profil',component:ProfileComponent},
    {path:'Examen',component:ExamenComponent},
    {path:'Examen/Examen-add',component:ExamenAddComponent}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }
