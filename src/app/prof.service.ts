import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Professeur } from './Object/Professeur';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) { }

  Prof!: Professeur;

  getProf(): Observable<Professeur> {
    return this.http.get(`https://127.0.0.1:8000/api/prof/prof`).pipe(
      map((res: any) => {
        this.Prof = res['data'];
        return this.Prof;
      }),
      catchError(this.handleError));
  }
  getCours(){
    return this.http.get(`https://127.0.0.1:8000/api/prof/cours`).pipe(
      map((res: any) => {
        this.Prof = res['data'];
        return this.Prof;
      }),
      catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
