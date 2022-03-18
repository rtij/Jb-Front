import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { StockequipeComponent } from './stockequipe/stockequipe.component';
import { UrneComponent } from './urne/urne.component';
import { LivrableComponent } from './livrable/livrable.component';
import { DepotUComponent } from './depot-u/depot-u.component';
import { RamassageUComponent } from './ramassage-u/ramassage-u.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import { TriComponent } from './tri/tri.component';


@NgModule({
  declarations: [
    UsersComponent,
    StockequipeComponent,
    UrneComponent,
    LivrableComponent,
    DepotUComponent,
    RamassageUComponent,
    TriComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule,
    ToastrModule.forRoot(),
    UsersRoutingModule
  ]
})
export class UsersModule { }
