import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Annee } from '../Object/Annee';
import { catchError, map, Observable, throwError } from 'rxjs';
import { url } from './Proxy';

@Injectable({
  providedIn: 'root'
})
export class AnneeService {

  constructor(private http: HttpClient) { }
  Annee!: Annee;
  
  getAll(): Observable<Annee> {
    return this.http.get(url+`api/annee/AnneEncours`).pipe(
      map((res: any) => {
        this.Annee = res['data'];
        return this.Annee;
      }),
      catchError(this.handleError));
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
