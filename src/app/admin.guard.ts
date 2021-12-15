import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './login.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  path: ActivatedRouteSnapshot[] | undefined; route: ActivatedRouteSnapshot | undefined;

  constructor(
    private router: Router,
    private authenticateService: LoginService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticateService.isLogedIn() == true) {
      let code = localStorage.getItem('code');
      if(code){
        if(this.authenticateService.getUserType(code)=="AD"){
          return true;
        }
      }
    } 
    this.authenticateService.Logout();
    this.authenticateService.removeData();
    this.router.navigate(['/login']);
      return false;
  }

}
