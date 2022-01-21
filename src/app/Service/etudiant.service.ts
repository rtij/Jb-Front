import { Time } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Documents } from '../Object/Documents';
import { Etudiant } from '../Object/Etudiant';
import { ExamTitre } from '../Object/ExamTitre';
import { GetResultTime } from '../Object/Function';
import { MessageEtudiant } from '../Object/MessageEtudiant';
import { ModuleProfesseur } from '../Object/ModuleProfesseur';
import { Professeur } from '../Object/Professeur';
import { Responsabilite } from '../Object/Responsabilite';
import { url } from './Proxy';

@Injectable({
  providedIn: 'root'
})
export class EtudiantService {

  constructor(private http: HttpClient) { }

  Etudiants!: Etudiant;
  Documents:Documents[] = [];
  ProfesseurListe:Professeur[]=[];
  ResponsableListe:Responsabilite[]=[];
  response!:string;
  ModuleProfesseurListe:ModuleProfesseur[]= [];
  selectedCours!:Documents;
  selectedExam!:ExamTitre;
  MessageEtudiant:MessageEtudiant[] = [];
  ExamListe:ExamTitre[] = [];
  ActualTime!:Date;

  // GetDataFunction
  getEtudiant(): Observable<Etudiant> {
    return this.http.get(url + `api/etudiant/etudiant`).pipe(
      map((res: any) => {
        this.Etudiants = res['data'];
        return this.Etudiants;
      }),
      catchError(this.handleError));
  }

  getCours(){
    return this.http.get(url + `api/etudiant/cours/`+ this.Etudiants.idetudiant).pipe(
      map((res: any) => {
        this.Documents = res['data'];
        return this.Documents;
      }),
      catchError(this.handleError));
  }

  getEtudiantProfs(){
    return this.http.get(url+`api/etudiant/professeur/`+ this.Etudiants.idetudiant).pipe
    (map((res:any)=>{
      this.ModuleProfesseurListe = res['data'];
      return this.ModuleProfesseurListe;
    }),
    catchError(this.handleError));
  }

  getResponsable(){
    return this.http.get(url+`api/etudiant/responsable/`+ this.Etudiants.idetudiant).pipe
    (map((res:any)=>{
      this.ResponsableListe = res['data'];
      return this.ResponsableListe;
    }),
    catchError(this.handleError));
    
  }

  getMessageEtudiant(){
    return this.http.get(url+`api/etudiant/message/liste/`+ this.Etudiants.idetudiant).pipe
    (map((res:any)=>{
      this.MessageEtudiant = res['data'];
      return this.MessageEtudiant;
    }),
    catchError(this.handleError));
    
  }

  getExamEtudiant(){
    return this.http.get(url+`api/etudiant/exam/liste/`+ this.Etudiants.idetudiant).pipe
    (map((res:any)=>{
      this.ExamListe = res['data'];
      return this.ExamListe;
    }),
    catchError(this.handleError));
    
  }

  
  getTime(){
    return this.http.get(url+`api/etudiant/time`).pipe
    (map((res:any)=>{
     this.ActualTime = res['data'];
    return this.ActualTime;
    }),
    catchError(this.handleError));
    
  }


  // Action function
  SendMessage(Professeur:Professeur, message:string){
    return this.http.post(url+`api/etudiant/message/`+this.Etudiants.idetudiant+'/'+Professeur.idprofesseur ,{message:message}).pipe(
      map((res:any)=>{
      this.response = res['data'];
      return this.response;
    }),
    catchError(this.handleError)
    );
  }


  ModifMdp(mdp:string){
    return this.http.put(url+`api/etudiant/mdpEdit/`+this.Etudiants.idetudiant,{mdp:mdp}).pipe(
      map((res:any)=>{
      this.response = res['data'];
      return this.response;
    }),
    catchError(this.handleError)
    );
  }

  getResponsableListe(): Responsabilite[]{
    return this.ResponsableListe;
  }

  getDocuments(){
    return this.Documents;
  }
  sendEtudiant(){
    return this.Etudiants;
  }

  DestructData(){
    const it:any = undefined;
    this.Etudiants = it;
    this.Documents = [];
    this.ModuleProfesseurListe = [];
    this.ResponsableListe = [];
    this.ProfesseurListe = [];
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
