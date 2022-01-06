import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Documents } from '../Object/Documents';
import { Etudiant } from '../Object/Etudiant';
import { url } from './Proxy';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) { }
  
  Etudiants!: Etudiant;
  Documents!:Documents[];
  getEtudiant(): Observable<Etudiant> {
    return this.http.get(url + `api/etudiant/etudiant`).pipe(
      map((res: any) => {
        this.Etudiants = res['data'];
        return this.Etudiants;
      }),
      catchError(this.handleError));
  }

  getCours(){
    return this.http.get(url + `api/etudiant/cours`).pipe(
      map((res: any) => {
        this.Documents = res['data'];
        return this.Documents;
      }),
      catchError(this.handleError));
  }



  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
