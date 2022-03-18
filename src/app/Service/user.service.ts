import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Stocke } from 'src/Object/Stocke';
import { Users } from 'src/Object/Users';
import { url } from 'src/Object/url';
import { Tsena } from 'src/Object/Tsena';
import { Depotu } from 'src/Object/Depotu';
import { Article } from 'src/Object/Article';
import { Ramassage } from 'src/Object/Ramassage';
import { DateToShortDate } from 'src/Object/Functions';
import { Mouvement } from 'src/Object/Mvt';
import { Participation } from 'src/Object/Participation';
import { Tri } from 'src/Object/Tri';
import { Livrables } from 'src/Object/Livrables';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  User!: Users;
  Stocke: Stocke[] = [];
  Tsena: Tsena[] = [];
  Depotu: Depotu[] = [];
  SelectedDepot!:Depotu;
  RamassageL:Ramassage[] = [];
  MvtListe:Mouvement[] = [];
  Participation:Participation[] = [];

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


  getDepotTsena(Tsena:Tsena){
    return this.http.get(url+'api/users/tsena/depot/'+Tsena.codet).pipe(
      map((res:any)=>{
        this.SelectedDepot = res['data'];
        return this.SelectedDepot;
      }),
      catchError(this.handleError)
    )
  }

  SaveRamassage(Ramassage:Ramassage){
    return this.http.post(url+'api/users/ramassage/create', {data:Ramassage}).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  getRamassageDepot(Depot:Depotu){
    return this.http.get(url+'api/users/ramassage/depot/'+Depot.iddep).pipe(
      map((res:any)=>{
        this.RamassageL = res['data'];
        this.RamassageL.forEach((item)=>{
          item.dater = DateToShortDate(item.dater);
          return item;
        });
        return this.RamassageL;
      }),
      catchError(this.handleError)
    )
  }

  getApproUser(){
    return this.http.get(url+'api/users/appro/liste/'+this.User.codeu).pipe(
      map((res:any)=>{
        let r = res['data'];
        this.MvtListe = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  getParticipationList(){
    return this.http.get(url+'api/users/participation/liste').pipe(
      map((res:any)=>{
        this.Participation = res['data'];
        this.Participation.forEach((item)=>{
          item.dates = DateToShortDate(item.dates);
        })
        return this.Participation;
      }),
      catchError(this.handleError)
    )
  }
  createParticipation(Participation:Participation){
    return this.http.post(url+'api/users/participation/create/' + this.User.codeu, {data:Participation}).pipe(
      map((res:any)=>{
        this.Participation = res['data'];
        return this.Participation;
      }),
      catchError(this.handleError)
    )
  }

  createLivrables(Livrables:Livrables){
    return this.http.post(url+'api/users/livrables/create/'+this.User.codeu,{data:Livrables}).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }



  SaveTri(Tri:Tri){
    return this.http.post(url+'api/users/tri/create/'+this.User.codeu,{data:Tri}).pipe(
      map((res:any)=>{
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  UpdateParticipation(Participation:Participation){
    return this.http.get(url+'api/users/participation/update/'+Participation.idparticipation).pipe(
      map((res:any)=>{
        this.Participation = res['data'];
        return this.Participation;
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
