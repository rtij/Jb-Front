import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';
import { Article } from 'src/Object/Article';
import { Contacts } from 'src/Object/Contacts';
import { Depotu } from 'src/Object/Depotu';
import { Detlivrables } from 'src/Object/Detlivrable';
import { DetailsMvt } from 'src/Object/Detmvt';
import { Equipe } from 'src/Object/Equipe';
import { HistoStock } from 'src/Object/Histostock';
import { Histoe } from 'src/Object/Histostocke';
import { Livrables } from 'src/Object/Livrables';
import { Mouvement } from 'src/Object/Mvt';
import { Participation } from 'src/Object/Participation';
import { Ramassage } from 'src/Object/Ramassage';
import { Stocke } from 'src/Object/Stocke';
import { Tri } from 'src/Object/Tri';
import { TypeU } from 'src/Object/TypeU';
import { url } from 'src/Object/url';
import { Users } from 'src/Object/Users';
import { Villei } from 'src/Object/Villei';
import { DateFormate, DateToShortDate, FormateDate, GetResultTime } from '../../Object/Functions';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }
  UserTypeListe: TypeU[] = [];
  UserListe: Users[] = [];
  LastUser!: Users;
  lastUserCode: number = 0;
  EquipeL: Equipe[] = [];
  VilleIL: Villei[] = [];
  Artilcles: Article[] = [];
  StockE: Stocke[] = [];
  histoStocke: Histoe[] = [];
  DetMvtListe: DetailsMvt[] = [];
  HistoStockListe: HistoStock[] = [];
  User!: Users;
  DepotU: Depotu[] = [];
  Ramassage: Ramassage[] = [];
  Participation: Participation[] = [];
  Tri: Tri[] = [];
  Livrables: Livrables[] = [];
  Detlivrable:Detlivrables[] = [];
  getMyUser() {
    return this.http.get(url + 'api/admin/user').pipe(
      map((res: any) => {
        this.User = res['data'];
        return this.User;
      }),
      catchError(this.handleError)
    )
  }

  getUserType() {
    return this.http.get(url + `api/admin/user/Type`).pipe(
      map((res: any) => {
        this.UserTypeListe = res['data'];
        return this.UserTypeListe;
      }),
      catchError(this.handleError)
    );
  }

  getLastUser() {
    return this.http.get(url + 'api/admin/user/last').pipe(
      map((res: any) => {
        this.LastUser = res['data'];
        return this.LastUser;
      }),
      catchError(this.handleError)
    )
  }

  getUserListe() {
    return this.http.get(url + 'api/admin/user/liste').pipe
      (
        map((res: any) => {
          this.UserListe = res['data'];
          return this.UserListe;
        }),
        catchError(this.handleError)
      )
  }

  SaveUsers(Users: Users) {
    return this.http.post(url + 'api/admin/user/new', { data: Users }).pipe(
      map((res: any) => {
        let r = res['data'];
        this.LastUser = r;
        let c = this.LastUser.codeu;
        if (c) {
          this.lastUserCode = c;
        }
        return r;
      }),
      catchError(this.handleError)
    )
  }

  UpdateUser(User: Users) {
    return this.http.put(url + 'api/admin/user/update/' + User.codeu, { data: User }).pipe(
      map((res: any) => {
        this.UserListe = res['data'];
        return this.UserListe;
      }),
      catchError(this.handleError)
    )
  }
  SaveUsersContacts(contact: string) {
    return this.http.post(url + 'api/admin/user/contacts/' + this.LastUser.codeu, { data: contact }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  RemoveUserContacts(contacts: Contacts) {
    return this.http.delete(url + 'api/admin/user/contacts/remove/' + contacts.idcontacts).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      })
    )
  }

  GetEquipeListe() {
    return this.http.get(url + "api/admin/equipe/liste").pipe(
      map((res: any) => {
        this.EquipeL = res['data'];
        return this.EquipeL;
      })
    )
  }

  CreateEquipe(Equipe: Equipe) {
    return this.http.post(url + "api/admin/equipe/create", { data: { Equipe } }).pipe(
      map((res: any) => {
        this.EquipeL = res['data'];
        return this.EquipeL;
      }),
      catchError(this.handleError)
    )
  }

  UpdateEquipe(Equipe: Equipe) {
    return this.http.put(url + 'api/admin/equipe/update/' + Equipe.idequipe, { data: { Equipe } }).pipe(
      map((res: any) => {
        this.EquipeL = res;
        return this.EquipeL;
      }),
      catchError(this.handleError)
    )
  }

  VilleiListe() {
    return this.http.get(url + "api/admin/villei/liste").pipe(
      map((res: any) => {
        this.VilleIL = res['data'];
        return this.VilleIL;
      }),
      catchError(this.handleError)
    )
  }
  UpdateVillei(Villei: Villei) {
    return this.http.put(url + "api/admin/villei/update/" + Villei.idvillei, { data: { Villei } }).pipe(
      map((res: any) => {
        this.VilleIL = res['data'];
        return this.VilleIL;
      }),
      catchError(this.handleError)
    )
  }

  CreateVillei(libelle: string) {
    return this.http.post(url + "api/admin/villei/create", { data: { libelle } }).pipe(
      map((res: any) => {
        this.VilleIL = res['data'];
        return this.VilleIL;
      }),
      catchError(this.handleError)
    )
  }

  getArticleListe() {
    return this.http.get(url + "api/admin/article/liste").pipe
      (
        map((res: any) => {
          this.Artilcles = res['data'];
          return this.Artilcles;
        }),
        catchError(this.handleError)
      );

  }

  createArticle(Article: Article) {
    return this.http.post(url + "api/admin/article/create", { data: Article }).pipe
      (
        map((res: any) => {
          this.Artilcles = res['data'];
          return this.Artilcles;
        }),
        catchError(this.handleError)
      );
  }

  updateArticle(Article: Article) {
    return this.http.put(url + "api/admin/article/update/" + Article.idarticle, { data: Article }).pipe(
      map((res: any) => {
        this.Artilcles = res['data'];
        return this.Artilcles;
      }),
      catchError(this.handleError)
    );
  }
  // Mvt part

  SaveMvt(Mvt: Mouvement) {
    return this.http.post(url + "api/admin/mvt/create", { data: Mvt }).pipe(
      map((res: any) => {
        let a = res['data'];
        return a;
      }),
      catchError(this.handleError)
    )
  }

  SaveDetMvt(DetMvt: DetailsMvt) {
    return this.http.post(url + 'api/admin/detmvt/create/' + DetMvt.idmvt.idmvt, { data: DetMvt }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  UpdateStock(Qte: number, Article: Article) {
    return this.http.post(url + "api/admin/stock/update/" + Article.idarticle, { data: Qte }).pipe
      (
        map((res: any) => {
          let r = res['data'];
          return r;
        }),
        catchError(this.handleError)
      )
  }

  SaveHistoStock(h: HistoStock) {
    return this.http.post(url + "api/admin/stock/historique", { data: h }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  getStockE() {
    return this.http.get(url + 'api/admin/equipe/stock/liste').pipe(
      map((res: any) => {
        this.StockE = res['data'];
        return this.StockE;
      }),
      catchError(this.handleError)
    )
  }

  UpdateStockEquipe(Stocke: Stocke) {
    return this.http.post(url + 'api/admin/equipe/stock', { data: Stocke }).pipe(
      map((res: any) => {
        let r = res['data'];
        return r;
      }),
      catchError(this.handleError)
    )
  }

  saveHistoStockE(Histoe: Histoe) {
    return this.http.post(url + 'api/admin/equipe/histo/stock/create', { data: Histoe }).pipe(
      map((res: any) => {
        this.histoStocke = res['data'];
        return this.histoStocke;
      }),
      catchError(this.handleError)
    )
  }

  getDetMvtListe() {
    return this.http.get(url + 'api/admin/detmvt/liste').pipe(
      map((res: any) => {
        this.DetMvtListe = res['data'];
        this.DetMvtListe.forEach((item) => {
          if(item.dater){
            item.dater = DateToShortDate(item.dater);  
          }
          return item;
        });
        return this.DetMvtListe;
      }),
      catchError(this.handleError)
    )
  }

  getHistoStockliste() {
    return this.http.get(url + 'api/admin/historique/stock/liste').pipe(
      map((res: any) => {
        this.HistoStockListe = res['data'];
        this.HistoStockListe.forEach((item) => {
          item.dateh = DateToShortDate(item.dateh);
          return item
        });
        return this.HistoStockListe;
      }),
      catchError(this.handleError)
    )
  }

  

  getDepotUListe() {
    return this.http.get(url + 'api/admin/depotu/liste').pipe(
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
    return this.http.get(url + 'api/admin/ramassage/liste').pipe(
      map((res: any) => {
        this.Ramassage = res['data'];
        this.Ramassage.forEach((item) => {
          item.dater = DateToShortDate(item.dater);
          return item;
        });
        return this.Ramassage;
      }),
      catchError(this.handleError)
    )
  }

  getParticipationListe() {
    return this.http.get(url + 'api/admin/participation/liste').pipe(
      map((res: any) => {
        this.Participation = res['data'];
        return this.Participation;
      }),
      catchError(this.handleError)
    )
  }

  getTriListe() {
    return this.http.get(url + 'api/admin/tri/liste').pipe(
      map((res: any) => {
        this.Tri = res['data'];
        return this.Tri;
      }),
      catchError(this.handleError)
    )
  }

  getLivrablesListe() {
    return this.http.get(url + 'api/admin/livrables/liste').pipe(
      map((res: any) => {
        this.Livrables = res['data'];
        this.Livrables.forEach((item) => {
          item.datea = DateToShortDate(item.datea);
        })
        return this.Livrables;
      }),
      catchError(this.handleError)
    )
  }

  getHistoStockEquipe(){
    return this.http.get(url+'api/admin/histoe/liste').pipe(
      map((res:any)=>{
        this.histoStocke = res['data'];
        this.histoStocke.forEach((item)=>{
          item.dateh = DateToShortDate(item.dateh);
          return item;
        })
        return this.histoStocke;
      }),
      catchError(this.handleError)
    )
  }
  DetLivrablesListe(){
    return this.http.get(url+'api/admin/detlivrable/liste').pipe(
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

  Reset() {
    let nu:any = null;
    this.UserTypeListe = [];
    this.UserListe = [];
    this.LastUser = nu;
    this.lastUserCode = 0;
    this.EquipeL = [];
    this.VilleIL = [];
    this.Artilcles = [];
    this.StockE = [];
    this.histoStocke = [];
    this.DetMvtListe= [];
    this.HistoStockListe = [];
    this.User = nu;
    this.DepotU= [];
    this.Ramassage= [];
    this.Participation = [];
    this.Tri= [];
    this.Livrables = [];
  }
  // Handle Error
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }

}
