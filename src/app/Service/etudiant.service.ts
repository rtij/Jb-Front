import { Time } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Documents } from '../Object/Documents';
import { Etudiant } from '../Object/Etudiant';
import { ExamEtudiant } from '../Object/ExamEtudiant';
import { ExamReponse } from '../Object/ExamReponse';
import { ExamTitre } from '../Object/ExamTitre';
import { Flash } from '../Object/Flash';
import { DateToShortDate, GetResultTime } from '../Object/Function';
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
  Documents: Documents[] = [];
  ProfesseurListe: Professeur[] = [];
  ResponsableListe: Responsabilite[] = [];
  response!: string;
  ModuleProfesseurListe: ModuleProfesseur[] = [];
  selectedCours!: Documents;
  selectedExam!: ExamTitre;
  MessageEtudiant: MessageEtudiant[] = [];
  ExamListe: ExamTitre[] = [];
  ActualTime!: Date;
  EtudiantExam!: ExamEtudiant;
  info: Flash[] = [];
  // GetDataFunction
  getEtudiant(): Observable<Etudiant> {
    return this.http.get(url + `api/etudiant/etudiant`).pipe(
      map((res: any) => {
        this.Etudiants = res['data'];
        return this.Etudiants;
      }),
      catchError(this.handleError));
  }

  getCours() {
    return this.http.get(url + `api/etudiant/cours/` + this.Etudiants.idetudiant).pipe(
      map((res: any) => {
        this.Documents = res['data'];
        return this.Documents;
      }),
      catchError(this.handleError));
  }

  getEtudiantProfs() {
    return this.http.get(url + `api/etudiant/professeur/` + this.Etudiants.idetudiant).pipe
      (map((res: any) => {
        this.ModuleProfesseurListe = res['data'];
        return this.ModuleProfesseurListe;
      }),
        catchError(this.handleError));
  }

  getResponsable() {
    return this.http.get(url + `api/etudiant/responsable/` + this.Etudiants.idetudiant).pipe
      (map((res: any) => {
        this.ResponsableListe = res['data'];
        return this.ResponsableListe;
      }),
        catchError(this.handleError));

  }

  getMessageEtudiant() {
    return this.http.get(url + `api/etudiant/message/liste/` + this.Etudiants.idetudiant).pipe
      (map((res: any) => {
        this.MessageEtudiant = res['data'];
        return this.MessageEtudiant;
      }),
        catchError(this.handleError));

  }

  getInfo() {
    return this.http.get(url + `api/etudiant/flash` + this.Etudiants.idetudiant).pipe
      (map((res: any) => {
        const liste = res['data'];
        this.info = [];
        liste.forEach((item: any) => {
          const info: Flash = new Flash(item.info,DateToShortDate(item.expiration),DateToShortDate(item.diffusion),item.idflashInfo);
          this.info.push(info);
        });
        return this.info;
      }),
        catchError(this.handleError));

  }
  // Exam Service Start

  getExamEtudiant() {
    return this.http.get(url + `api/etudiant/exam/liste/` + this.Etudiants.idetudiant).pipe
      (map((res: any) => {
        const liste = res['data'];
        this.ExamListe = [];
        liste.forEach((item: any) => {
          const Exam: ExamTitre = new ExamTitre(item.titre, item.dureeI, GetResultTime(item.hDebut), GetResultTime(item.duree), item.idparcours, item.idprofesseur, item.idmodule, DateToShortDate(item.diffusion), item.idniveau, item.idexamQuestion, item.idexamTitre);
          this.ExamListe.push(Exam);
        });
        return this.ExamListe;
      }),
        catchError(this.handleError));

  }

  getTime() {
    return this.http.get(url + `api/etudiant/time`).pipe
      (map((res: any) => {
        this.ActualTime = res['data'];
        return this.ActualTime;
      }),
        catchError(this.handleError));
  }

  getServerCurrentTime() {
    return this.http.get(url + `api/etudiant/servertime`).pipe
      (map((res: any) => {
        console.log(res[('data')]);
      }),
        catchError(this.handleError));
  }

  EtudiantExamStart(Exam: ExamTitre) {
    return this.http.get(url + `api/etudiant/examStart/` + this.Etudiants.idetudiant + '/' + Exam.idexamTitre).pipe
      (map((res: any) => {
        return this.EtudiantExam = res['data'];
      }),
        catchError(this.handleError));
  }


  SendQuestionResponse(ExamReponse: ExamReponse) {
    let target = "";
    if (ExamReponse.idchoix) {
      target = url + `api/etudiant/examResponse/` + ExamReponse.idexamQuestion.idexamQuestion + '/' + ExamReponse.Examtudiant.idexamEtudiant + '/' + ExamReponse.idchoix.idchoix;
    }
    else {
      target = url + `api/etudiant/examResponse/` + ExamReponse.idexamQuestion.idexamQuestion + '/' + ExamReponse.Examtudiant.idexamEtudiant;
    }
    return this.http.post(target, { data: ExamReponse }).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  // Action function
  SendMessage(Professeur: Professeur, message: string) {
    return this.http.post(url + `api/etudiant/message/` + this.Etudiants.idetudiant + '/' + Professeur.idprofesseur, { message: message }).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  SendMessageFile(Professeur: Professeur, Doc: FormData) {
    return this.http.post(url + `api/etudiant/message/file/` + this.Etudiants.idetudiant + '/' + Professeur.idprofesseur, Doc).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  ModifMdp(mdp: string) {
    return this.http.put(url + `api/etudiant/mdpEdit/` + this.Etudiants.idetudiant, { mdp: mdp }).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }


  // Data Communcation service
  getResponsableListe(): Responsabilite[] {
    return this.ResponsableListe;
  }

  getDocuments() {
    return this.Documents;
  }
  sendEtudiant() {
    return this.Etudiants;
  }

  DestructData() {
    const it: any = undefined;
    this.Etudiants = it;
    this.Documents = [];
    this.ModuleProfesseurListe = [];
    this.ResponsableListe = [];
    this.ProfesseurListe = [];
    this.ExamListe = [];
    this.selectedCours = it;
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
