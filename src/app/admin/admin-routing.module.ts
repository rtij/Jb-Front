import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockEquipeComponent } from '../stock-equipe/stock-equipe.component';
import { AdminComponent } from './admin.component';
import { ArticleComponent } from './article/article.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EquipeComponent } from './equipe/equipe.component';
import { HistoqteComponent } from './histoqte/histoqte.component';
import { LivrableComponent } from './livrable/livrable.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { ProfileComponent } from './profile/profile.component';
import { SaisiemComponent } from './saisiem/saisiem.component';
import { StockComponent } from './stock/stock.component';
import { StockaComponent } from './stocka/stocka.component';
import { UsersComponent } from './users/users.component';
import { VilleiComponent } from './villei/villei.component';

const routes: Routes = [
  {
    path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: 'Dashboard', component: DashboardComponent },
      { path: 'Profil', component: ProfileComponent },
      { path: 'Article', component: ArticleComponent },
      { path: 'Utilisateurs', component: UsersComponent },
      { path: 'Equipe', component: EquipeComponent },
      { path: 'VilleI', component: VilleiComponent },
      {
        path: 'Stocks', component: StockComponent, children: [
          { path: 'SaisieM', component: SaisiemComponent },
          { path: 'Mouvement', component: MouvementComponent },
          { path: 'Quantite', component: HistoqteComponent },
          { path: 'Equipe', component: StockEquipeComponent },
          { path: '', redirectTo: 'Liste', pathMatch: 'full' },
          { path: 'Liste', component: StockaComponent }
        ]
      },
      { path: 'Livrables', component: LivrableComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
