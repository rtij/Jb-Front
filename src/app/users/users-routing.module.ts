import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotUComponent } from './depot-u/depot-u.component';
import { LivrableComponent } from './livrable/livrable.component';
import { RamassageUComponent } from './ramassage-u/ramassage-u.component';
import { StockequipeComponent } from './stockequipe/stockequipe.component';
import { UrneComponent } from './urne/urne.component';
import { UsersComponent } from './users.component';

const routes: Routes = [
  { path: '', component: UsersComponent,children:[
    {path:'Livrables', component:LivrableComponent},
    {path:'Urnes', component:UrneComponent, children:[
      {path:'', redirectTo:'Depot',pathMatch:'full'},
      {path:'Depot', component:DepotUComponent},
      {path:'Ramassage', component:RamassageUComponent},

    ]},
    {path:'Stock', component:StockequipeComponent}
  ] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
