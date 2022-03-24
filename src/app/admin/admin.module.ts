import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArticleComponent } from './article/article.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { StockComponent } from './stock/stock.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EquipeComponent } from './equipe/equipe.component';
import { VilleiComponent } from './villei/villei.component';
import { ToastrModule } from 'ngx-toastr';
import { StockaComponent } from './stocka/stocka.component';
import { MouvementComponent } from './mouvement/mouvement.component';
import { HistoqteComponent } from './histoqte/histoqte.component';
import { SaisiemComponent } from './saisiem/saisiem.component';
import { LivrableComponent } from './livrable/livrable.component';
import { StockListeComponent } from './stock-liste/stock-liste.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UrneComponent } from './urne/urne.component';
import { DepotuComponent } from './depotu/depotu.component';
import { RamassageComponent } from './ramassage/ramassage.component';
import { StartComponent } from './start/start.component';
import { ItineraireComponent } from './itineraire/itineraire.component';
import { ListedComponent } from './listed/listed.component';
import { DistributionComponent } from './distribution/distribution.component';
import { ParticipationComponent } from './participation/participation.component';
import { PartListeComponent } from './part-liste/part-liste.component';
import { MotifComponent } from './motif/motif.component';
import { ParfumsComponent } from './parfums/parfums.component';
import { EnveloppeComponent } from './enveloppe/enveloppe.component';
import { ProduitComponent } from './produit/produit.component';
import { RecetteComponent } from './recette/recette.component';
import { EnvsemainecComponent } from './envsemainec/envsemainec.component';
import { EnvequipeComponent } from './envequipe/envequipe.component';
import { EnvviComponent } from './envvi/envvi.component';
import { HistoeComponent } from './histoe/histoe.component';
import { RecetteSCComponent } from './recette-sc/recette-sc.component';
import { EnvactiviteComponent } from './envactivite/envactivite.component';
import { ZonetComponent } from './zonet/zonet.component';
import { RecetteacComponent } from './recetteac/recetteac.component';
import { RecetteEquipeComponent } from './recette-equipe/recette-equipe.component';
import { RecetteviComponent } from './recettevi/recettevi.component';
import { RapportAnimationComponent } from './rapport-animation/rapport-animation.component';
import { EnvzonetComponent } from './envzonet/envzonet.component';
import { RecettezonetComponent } from './recettezonet/recettezonet.component';
import { HistoAppEquipeComponent } from './histo-app-equipe/histo-app-equipe.component';
import { ProduitEquipeComponent } from './produit-equipe/produit-equipe.component';
import { ProduitViComponent } from './produit-vi/produit-vi.component';
import { ProduitZoneComponent } from './produit-zone/produit-zone.component';
import { ProduitSemaineCComponent } from './produit-semaine-c/produit-semaine-c.component';
import { ProduitAcComponent } from './produit-ac/produit-ac.component';
import { ListeRComponent } from './liste-r/liste-r.component';
import { StockFaritanyComponent } from './stock-faritany/stock-faritany.component';

@NgModule({
  declarations: [
    AdminComponent,
    NavbarComponent,
    ArticleComponent,
    ProfileComponent,
    UsersComponent,
    StockComponent,
    EquipeComponent,
    VilleiComponent,
    StockaComponent,
    MouvementComponent,
    HistoqteComponent,
    SaisiemComponent,
    LivrableComponent,
    StockListeComponent,
    DashboardComponent,
    UrneComponent,
    DepotuComponent,
    RamassageComponent,
    StartComponent,
    ItineraireComponent,
    ListedComponent,
    DistributionComponent,
    ParticipationComponent,
    PartListeComponent,
    MotifComponent,
    ParfumsComponent,
    EnveloppeComponent,
    ProduitComponent,
    RecetteComponent,
    EnvsemainecComponent,
    EnvequipeComponent,
    EnvviComponent,
    HistoeComponent,
    RecetteSCComponent,
    EnvactiviteComponent,
    ZonetComponent,
    RecetteacComponent,
    RecetteEquipeComponent,
    RecetteviComponent,
    RapportAnimationComponent,
    EnvzonetComponent,
    RecettezonetComponent,
    HistoAppEquipeComponent,
    ProduitEquipeComponent,
    ProduitViComponent,
    ProduitZoneComponent,
    ProduitSemaineCComponent,
    ProduitAcComponent,
    ListeRComponent,
    StockFaritanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    AdminRoutingModule,
  ]
})
export class AdminModule { }
