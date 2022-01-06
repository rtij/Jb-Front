import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtudiantListComponent } from './etudiant-list/etudiant-list.component';
import { EtudiantComponent } from './etudiant.component';

const routes: Routes = [
  { path: '', component: EtudiantComponent,children:[
    {path:'',component:EtudiantListComponent}
  ] } 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EtudiantRoutingModule { }
