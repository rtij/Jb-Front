import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './client.component';
import { EnvactiviteComponent } from './envactivite/envactivite.component';
import { EnvsemainecComponent } from './envsemainec/envsemainec.component';
import { LivrablesComponent } from './livrables/livrables.component';
import { MotifComponent } from './motif/motif.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { ParticipationComponent } from './participation/participation.component';
import { ProduitAcComponent } from './produit-ac/produit-ac.component';
import { ProduitSemaineCComponent } from './produit-semaine-c/produit-semaine-c.component';
import { RapportAnimationComponent } from './rapport-animation/rapport-animation.component';
import { RecetteSCComponent } from './recette-sc/recette-sc.component';
import { RecetteacComponent } from './recetteac/recetteac.component';
import { UrneComponent } from './urne/urne.component';

const routes: Routes = [
  {
  path: '', component: ClientComponent, children: [
    { path: 'Urnes', component: UrneComponent },
    {
      path: 'Livrables', component: LivrablesComponent, children: [
        { path: 'EnvActivite', component: EnvactiviteComponent },
        { path: 'EnvSemaineC', component: EnvsemainecComponent },
        { path: 'RecetteAc', component: RecetteacComponent },
        { path: 'RecetteSc', component: RecetteSCComponent },
        { path: 'RapportAnimation', component: RapportAnimationComponent },
        { path: 'ProduitAc', component: ProduitAcComponent },
        { path: 'ProduitSemainec', component: ProduitSemaineCComponent }
      ]
    },
    {path:'Participation', component:ParticipationComponent, children:[
      {path:'Motif', component:MotifComponent},
      {path:'Parfums', component:ParfumsComponent}
    ]}
    

  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
