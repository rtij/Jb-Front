import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AdminGuard } from './service/admin.guard';
import { ClientGuard } from './service/client.guard';
import { UserGuard } from './service/user.guard';

const routes: Routes = [
  {path:'',redirectTo:'Login', pathMatch:'full'},
  {path:'Login',component:LoginComponent},
  { path: 'Admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),canActivate:[AdminGuard] },
  { path: 'Client', loadChildren: () => import('./client/client.module').then(m => m.ClientModule),canActivate:[ClientGuard] },
  { path: 'Users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule),canActivate:[UserGuard] },
  {path:'**', component:PageNotFoundComponent}
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }