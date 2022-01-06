import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './admin.guard';
import { EtudiantGuard } from './etudiant.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfGuard } from './prof.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate:[AdminGuard] },
  { path: 'etudiant', loadChildren: () => import('./etudiant/etudiant.module').then(m => m.EtudiantModule) ,canActivate:[EtudiantGuard]},
  { path: 'prof', loadChildren: () => import('./prof/prof.module').then(m => m.ProfModule), canActivate:[ProfGuard]},
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
