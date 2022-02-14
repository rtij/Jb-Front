import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SpinnerComponent } from '../spinner/spinner.component';
import { AdminEnseignantComponent } from './admin-enseignant/admin-enseignant.component';
import { AdminEtudiantComponent } from './admin-etudiant/admin-etudiant.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      {path:'',redirectTo:'Administrateur',pathMatch:'full'},
      { path: 'Enseignant', component: AdminEnseignantComponent },
      { path: 'Administrateur', component: AdminListComponent },
      {path:'Etudiant',component:AdminEtudiantComponent},
      {path:'FlashInfo',},
      {path:'spinner',component:SpinnerComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
