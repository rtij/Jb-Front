import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Employe } from '../Object/Employe';
import { url } from './Proxy';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  Employe!:Employe[];
  getAll(): Observable<Employe[]> {
    return this.http.get(url+`api/admin/AdminList`).pipe(
      map((res: any) => {
        this.Employe = res['data'];
        return this.Employe;
      }),
      catchError(this.handleError));
  }
  
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
