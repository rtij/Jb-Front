import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { AdminParametreComponent } from './admin-parametre/admin-parametre.component';
import { AdminEnseignantComponent } from './admin-enseignant/admin-enseignant.component';
import { AdminListComponent } from './admin-list/admin-list.component';
import { AdminModuleComponent } from './admin-module/admin-module.component';
import { AdminEtudiantComponent } from './admin-etudiant/admin-etudiant.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    AdminParametreComponent,
    AdminEnseignantComponent,
    AdminListComponent,
    AdminModuleComponent,
    AdminEtudiantComponent,

  ],
  imports: [
    CommonModule,
    Ng2SearchPipeModule,
    FormsModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
