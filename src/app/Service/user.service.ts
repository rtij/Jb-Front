import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Stocke } from 'src/Object/Stocke';
import { Users } from 'src/Object/Users';
import { url } from 'src/Object/url';
import { Tsena } from 'src/Object/Tsena';
import { Depotu } from 'src/Object/Depotu';
import { Article } from 'src/Object/Article';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  User!: Users;
  Stocke: Stocke[] = [];
  Tsena: Tsena[] = [];
  Depotu: Depotu[] = [];
  getUser() {
    return this.http.get(url + 'api/users/user').pipe(
      map((res: any) => {
        this.User = res['data'];
        return this.User;
      }),
      catchError(this.handleError)
    )
  }

  getStockEquipe() {
    return this.http.get(url + 'api/users/stocke/liste/' + this.User.idequipe?.idequipe).pipe(
      map((res: any) => {
        this.Stocke = res['data'];
        return this.Stocke;
      }),
      catchError(this.handleError)
    )
  }

  getTsenaListe() {
    return this.http.get(url + 'api/users/tsena/liste').pipe(
      map((res: any) => {
        this.Tsena = res['data'];
        return this.Tsena;
      }),
      catchError(this.handleError)
    )
  }


  CreateTsena(Tsena: Tsena) {
    return this.http.post(url + 'api/users/tsena/create', { data: Tsena }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  SaveDepot(Depot: Depotu) {
    return this.http.post(url + 'api/users/depot/create', { data: Depot }).pipe(
      map((res: any) => {
        this.Depotu = res['data'];
        return this.Depotu;
      }),
      catchError(this.handleError)
    )
  }

  UpdateStockEquipe(Article: Article, qte: number) {
    return this.http.post(url + 'api/users/stock/update/'+ Article.idarticle, {data:qte}).pipe(
      map((res:any)=>{
        this.Stocke = res['data'];
        return this.Stocke;
      }),
      catchError(this.handleError)
    )
  }

  // Handle Error
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
