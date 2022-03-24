import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Depotu } from 'src/Object/Depotu';
import { Detlivrables } from 'src/Object/Detlivrable';
import { DateToShortDate, GetResultTime } from 'src/Object/Functions';
import { Livrables } from 'src/Object/Livrables';
import { Participation } from 'src/Object/Participation';
import { Ramassage } from 'src/Object/Ramassage';
import { Tri } from 'src/Object/Tri';
import { url } from 'src/Object/url';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  DepotU: Depotu[] = [];
  Ramassage: Ramassage[] = [];
  Participation:Participation[]= [];
  Tri:Tri[] = [];
  Livrables:Livrables[] = [];
  
  Detlivrable:Detlivrables[] = [];

  getDepotUListe() {
    return this.http.get(url + 'api/client/depotu/liste').pipe(
      map((res: any) => {
        this.DepotU = res['data'];
        this.DepotU.forEach((item) => {
          item.dated = DateToShortDate(item.dated);
          let a: any = item.heured;
          item.heured = GetResultTime(a);
          return item
        });
        return this.DepotU;
      }),
      catchError(this.handleError)
    )
  }

  getRamassageListe() {
    return this.http.get(url+'api/admin/ramassage/liste').pipe(
      map((res:any)=>{
        this.Ramassage = res['data'];
        this.Ramassage.forEach((item)=>{
          item.dater = DateToShortDate(item.dater);
          return item;
        });
        return this.Ramassage;
      }),
      catchError(this.handleError)
    )
  }
  
  getParticipationListe() {
    return this.http.get(url+'api/client/participation/liste').pipe(
      map((res:any)=>{
        this.Participation = res['data'];
        return this.Participation;
      }),
      catchError(this.handleError)
    )
  }

  getTriListe(){
    return this.http.get(url+'api/client/tri/liste').pipe(
      map((res:any)=>{
        this.Tri = res['data'];
        return this.Tri;
      }),
      catchError(this.handleError)
    )
  }

  getLivrablesListe(){
    return this.http.get(url+'api/client/livrables/liste').pipe(
      map((res:any)=>{
        this.Livrables = res['data'];
        return this.Livrables;
      }),
      catchError(this.handleError)
    )
  }

  
  DetLivrablesListe(){
    return this.http.get(url+'api/client/detlivrable/liste').pipe(
      map((res:any)=>{
        this.Detlivrable = res['data'];
        this.Detlivrable.forEach((item)=>{
          item.idlivrables.datea = DateToShortDate(item.idlivrables.datea);
        })
        return this.Detlivrable;
      }),
      catchError(this.handleError)
    )
  }


  Reset(){
    this.Livrables = [];
    this.Participation = [];
    this.Tri = [];
    this.DepotU = [];
    this.Ramassage = [];
  }
  // Handle Error
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
