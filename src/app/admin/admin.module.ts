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
    StockListeComponent
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
