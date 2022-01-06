import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
import { url } from './Service/Proxy';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,private router: Router) { }
  token: string = "";

  Login(code: string, password: string) {
    return this.http.post(url+`login/login`, { code, password }).pipe(
      map((res: any) => {
        this.token = res['data'];
        return this.token;
      }),
      catchError(this.handleError));
  }
  Logout() {
    return this.http.get(url+`api/logout`).pipe(
      map((res: any) => {
        let response = res;
        return response;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }

  public getToken() {
    const ls = localStorage.getItem('token');
    return ls;
  }
  
  public storeToken(token:string){
    localStorage.setItem('token',token);
  }


  public removeData() {
    localStorage.removeItem('token');
    localStorage.removeItem('code');
  }

  getUserType(code:string){
    let id:string="";
    for(let i=0;i<2;i++){
      id = id+code[i];
    }
    return id;
  }


  isLogedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }
}
