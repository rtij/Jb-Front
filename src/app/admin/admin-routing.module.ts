import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminEnseignantComponent } from './admin-enseignant/admin-enseignant.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: 'enseignant', component: AdminEnseignantComponent },
      { path: '', component: AdminListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
