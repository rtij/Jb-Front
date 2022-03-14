import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from './service/login.service';

@Injectable({
  providedIn: 'root'
})
export class ProfGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticateService: LoginService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (this.authenticateService.isLogedIn() == true) {
      let code = localStorage.getItem('type');
      if (code) {
        if (this.authenticateService.getUserType(code) == "Administrateur") {
          return true;
        }
      }
    }
    this.authenticateService.Logout();
    this.authenticateService.removeData();
    this.router.navigate(['/']);
    return false;
  }

}
