import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockEquipeComponent } from '../stock-equipe/stock-equipe.component';
import { AdminComponent } from './admin.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DistributionComponent } from './distribution/distribution.component';
import { EnvactiviteComponent } from './envactivite/envactivite.component';
import { EnvequipeComponent } from './envequipe/envequipe.component';
import { EnvsemainecComponent } from './envsemainec/envsemainec.component';
import { EnvviComponent } from './envvi/envvi.component';
import { EnvzonetComponent } from './envzonet/envzonet.component';
import { EquipeComponent } from './equipe/equipe.component';
import { HistoAppEquipeComponent } from './histo-app-equipe/histo-app-equipe.component';
import { HistoqteComponent } from './histoqte/histoqte.component';
import { ItineraireComponent } from './itineraire/itineraire.component';
import { ListeRComponent } from './liste-r/liste-r.component';
import { ListedComponent } from './listed/listed.component';
import { LivrableComponent } from './livrable/livrable.component';
import { MotifComponent } from './motif/motif.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { PartListeComponent } from './part-liste/part-liste.component';
import { ParticipationComponent } from './participation/participation.component';
import { ProduitAcComponent } from './produit-ac/produit-ac.component';
import { ProduitEquipeComponent } from './produit-equipe/produit-equipe.component';
import { ProduitSemaineCComponent } from './produit-semaine-c/produit-semaine-c.component';
import { ProduitViComponent } from './produit-vi/produit-vi.component';
import { ProduitZoneComponent } from './produit-zone/produit-zone.component';
import { ProfileComponent } from './profile/profile.component';
import { RamassageComponent } from './ramassage/ramassage.component';
import { RapportAnimationComponent } from './rapport-animation/rapport-animation.component';
import { RecetteEquipeComponent } from './recette-equipe/recette-equipe.component';
import { RecetteSCComponent } from './recette-sc/recette-sc.component';
import { RecetteacComponent } from './recetteac/recetteac.component';
import { RecetteviComponent } from './recettevi/recettevi.component';
import { RecettezonetComponent } from './recettezonet/recettezonet.component';
import { SaisiemComponent } from './saisiem/saisiem.component';
import { StartComponent } from './start/start.component';
import { StockFaritanyComponent } from './stock-faritany/stock-faritany.component';
import { StockComponent } from './stock/stock.component';
import { StockaComponent } from './stocka/stocka.component';
import { UrneComponent } from './urne/urne.component';
import { UsersComponent } from './users/users.component';
import { VilleiComponent } from './villei/villei.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'Start', pathMatch: 'full' },
      { path: 'Start', component: StartComponent },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profil', component: ProfileComponent },
      { path: 'Article', component: ArticleComponent },
      { path: 'Utilisateurs', component: UsersComponent },
      { path: 'Equipe', component: EquipeComponent },
      { path: 'VilleI', component: VilleiComponent },
      {
        path: 'Urnes', component: UrneComponent, children: [
          { path: '', redirectTo: 'ListeDepot', pathMatch: 'full' },
          { path: 'ListeDepot', component: ListedComponent },
          { path: 'Itineraire', component: ItineraireComponent },
          { path: 'Distribution', component: DistributionComponent },
          { path: 'Ramassage', component: RamassageComponent }
        ]
      },
      {
        path: 'Participation', component: ParticipationComponent,
        children: [
          { path: 'Parfums', component: ParfumsComponent },
          { path: 'Motif', component: MotifComponent },
          { path: 'Liste', component: PartListeComponent }
        ]
      },
      {
        path: 'Stocks', component: StockComponent, children: [
          { path: 'SaisieM', component: SaisiemComponent },
          { path: 'Mouvement', component: MouvementComponent },
          { path: 'Quantite', component: HistoqteComponent },
          { path: 'Equipe', component: StockEquipeComponent },
          {path:'Faritany', component:StockFaritanyComponent},
          {path:'Retour', component:ListeRComponent},
          { path: '', redirectTo: 'Liste', pathMatch: 'full' },
          { path: 'Liste', component: StockaComponent }
        ]
      },
      {
        path: 'Livrables', component: LivrableComponent,
        children: [
          {path:'EnvEquipe', component:EnvequipeComponent},
          {path:'HistoAppEquipe', component:HistoAppEquipeComponent},
          {path:'ProduitEquipe', component:ProduitEquipeComponent},
          {path:'ProduitVi', component:ProduitViComponent},
          {path:'ProduitSemaineC', component:ProduitSemaineCComponent},
          {path:'ProduitZonet', component:ProduitZoneComponent},
          {path:'ProduitActivite', component:ProduitAcComponent},
          {path:'EnvVilleIntermediaire', component:EnvviComponent},
          {path:'EnvActivite', component:EnvactiviteComponent},
          {path:'EnvSemaineC', component:EnvsemainecComponent},
          {path:'RecetteEquipe',component:RecetteEquipeComponent},
          {path:'RecetteVi',component:RecetteviComponent},
          {path:'RecetteSC', component:RecetteSCComponent},
          {path:'RecetteAc',component:RecetteacComponent},
          {path:'RapportAnimation', component:RapportAnimationComponent},
          {path:'RecetteZoneTana', component:RecettezonetComponent},
          {path:'EnvZoneA', component:EnvzonetComponent}
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
