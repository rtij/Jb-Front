import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { UrneComponent } from './urne/urne.component';
import { LivrablesComponent } from './livrables/livrables.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { ParticipationComponent } from './participation/participation.component';
import { MotifComponent } from './motif/motif.component';
import { ProduitComponent } from './produit/produit.component';
import { RecetteComponent } from './recette/recette.component';
import { EnveloppeComponent } from './enveloppe/enveloppe.component';
import { EnvsemainecComponent } from './envsemainec/envsemainec.component';
import { RecetteSCComponent } from './recette-sc/recette-sc.component';
import { EnvactiviteComponent } from './envactivite/envactivite.component';
import { RecetteacComponent } from './recetteac/recetteac.component';
import { RapportAnimationComponent } from './rapport-animation/rapport-animation.component';
import { ProduitAcComponent } from './produit-ac/produit-ac.component';
import { ProduitSemaineCComponent } from './produit-semaine-c/produit-semaine-c.component';
import { ParfumsComponent } from './parfums/parfums.component';


@NgModule({
  declarations: [
    ClientComponent,
    UrneComponent,
    LivrablesComponent,
    ParticipationComponent,
    MotifComponent,
    ProduitComponent,
    RecetteComponent,
    EnveloppeComponent,
    EnvsemainecComponent,
    RecetteSCComponent,
    EnvactiviteComponent,
    RecetteacComponent,
    RapportAnimationComponent,
    ProduitAcComponent,
    ProduitSemaineCComponent,
    ParfumsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    ClientRoutingModule
  ]
})
export class ClientModule { }
