import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfAccComponent } from './prof-acc/prof-acc.component';
import { ProfComponent } from './prof.component';

const routes: Routes = [
  {path: '', component: ProfComponent,children:[
    {path:'',component:ProfAccComponent}
  ] },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfRoutingModule { }
