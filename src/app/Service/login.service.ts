import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Authtoken } from 'src/Object/Authtoken';
import { url } from 'src/Object/url';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }
  Authtoken!:Authtoken;
  Login(username: string, password: string) {
    return this.http.post(url + 'login/login', { data: { username, password } }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError));
  }


  Logout() {
    return this.http.get(url + `login/logout`).pipe(
      map((res: any) => {
        let response = res;
        this.removeData();
        return response;
      }),
      catchError(this.handleError));
  }

  getUser(){
    return this.http.get(url + `login/myuser`).pipe(
      map((res:any)=>{
        let r = res['data'];
        this.Authtoken = res['data'];
        return this.Authtoken;
      }),
      catchError(this.handleError)
    );
  }

  // Local action
  public getToken() {
    const ls = localStorage.getItem('token');
    return ls;
  }

  public storeToken(token: string) {
    localStorage.setItem('token', token);
  }


  public removeData() {
    localStorage.removeItem('token');
    localStorage.removeItem('code');
  }

  getUserType(code: string) {
    let id: string = "";
    for (let i = 0; i < 2; i++) {
      id = id + code[i];
    }
    return id;
  }


  isLogedIn(): boolean {
    if (this.getToken()) {
      return true;
    }
    return false;
  }

  // Handle Error
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
