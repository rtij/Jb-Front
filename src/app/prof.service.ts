import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Choix } from './Object/Choix';
import { DocLien } from './Object/DocLien';
import { Documents } from './Object/Documents';
import { Etudiant } from './Object/Etudiant';
import { ExamQuestion } from './Object/ExamQuestion';
import { ExamTitre } from './Object/ExamTitre';
import { DateToShortDate, GetResultTime, getTimeLocaleTime } from './Object/Function';
import { ModuleProfesseur } from './Object/ModuleProfesseur';
import { Professeur } from './Object/Professeur';
import { QuestionType } from './Object/QuestionType';
import { url } from './Service/Proxy';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) { }

  Prof!: Professeur;
  ProfModule!: ModuleProfesseur[];
  Docs!: Documents[];
  Etudiants!: Etudiant[];
  Exam!: ExamTitre;
  response: string = "";
  last!: number;
  QuestionType!: QuestionType[];
  ExamQuestionListe!:ExamQuestion[];
  ExamLastQuestion!:ExamQuestion;

  getProf(): Observable<Professeur> {
    return this.http.get(url + `api/prof/prof`).pipe(
      map((res: any) => {
        this.Prof = res['data'];
        return this.Prof;
      }),
      catchError(this.handleError));
  }
  getCours(): Observable<ModuleProfesseur[]> {
    return this.http.get(url + `api/prof/cours`).pipe(
      map((res: any) => {
        this.ProfModule = res['data'];
        return this.ProfModule;
      }),
      catchError(this.handleError));
  }
  getDocs(): Observable<Documents[]> {
    return this.http.get(url + `api/prof/docs`).pipe(
      map((res: any) => {
        this.Docs = res['data'];
        return this.Docs;
      }),
      catchError(this.handleError));
  }

  getEnseignant(): Observable<ModuleProfesseur[]> {
    return this.http.get(url + `api/prof/enseignant`).pipe(
      map((res: any) => {
        this.ProfModule = res['data'];
        return this.ProfModule;
      }),
      catchError(this.handleError));
  }


  getEtudiant(): Observable<Etudiant[]> {
    return this.http.get(url + `api/prof/etudiant`).pipe(
      map((res: any) => {
        this.Etudiants = res['data'];
        return this.Etudiants;
      }),
      catchError(this.handleError));
  }

  AddDocs(Doc: Documents): Observable<Documents[]> {
    return this.http.post(url + `api/prof/docs/ajout`, { data: Doc }).pipe(
      map((res: any) => {
        this.Docs = res['data'];
        return this.Docs;
      }),
      catchError(this.handleError));
  }

  ModifProf(Prof: Professeur): Observable<Professeur> {
    return this.http.put(url + `api/prof/modif/` + Prof.idprofesseur, { data: Prof }).pipe(
      map((res: any) => {
        this.Prof = res['data'];
        return this.Prof;
      }),
      catchError(this.handleError));
  }

  UploadDoc(file: FormData, idDoc: number) {
    return this.http.post(url + `api/prof/doclien/ajout/` + idDoc, file).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError));
  }
  RemoveDoc(doc: Documents) {
    return this.http.post(url + `api/prof/docs/remove/` + doc.iddocument, doc).pipe(
      map((res: any) => {
        this.Docs = res['data'];
        return this.Docs;
      }),
      catchError(this.handleError));
  }
  RemoveDocLien(doclien: DocLien) {
    return this.http.get(url + `api/prof/doclien/suppr/` + doclien.iddocLien).pipe(
      map((res: any) => {
        this.Docs = res['data'];
        return this.Docs;
      }),
      catchError(this.handleError));

  }
  getLastID() {
    return this.http.get(url + `api/prof/docs/last`).pipe(
      map((res: any) => {
        this.last = res['data'];
        return this.last;
      }),
      catchError(this.handleError));
  }

  createExam(Exam: ExamTitre) {
    return this.http.post(url + `api/prof/exam/ajout`, { data: Exam }).pipe(
      map((res: any) => {
        this.Exam = res['data'];
        return this.Exam;
      }),
      catchError(this.handleError));
  }
  getLastExam(): Observable<ExamTitre> {
    return this.http.get(url + `api/prof/exam/last`).pipe(
      map((res: any) => {
        const data: any = res['data'];
        GetResultTime(data.duree);
        const Exam:ExamTitre = new ExamTitre(data.titre,data.dureeI,GetResultTime(data.hDebut),GetResultTime(data.duree),data.idparcours,data.idprofesseur,data.idmodule,DateToShortDate(data.diffusion),data.idniveau,data.idexamTitre);
        this.Exam = Exam;
        return this.Exam;
      }),
      catchError(this.handleError));

  }
  getExamListe() {

  }

  getQuestionType() {
    return this.http.get(url + `api/prof/exam/question/type`).pipe(
      map((res: any) => {
        this.QuestionType = res['data'];
        return this.QuestionType;
      }),
      catchError(this.handleError));
  }
  AddQuestion(Question:ExamQuestion){
    return this.http.post(url + `api/prof/exam/question/add/`+Question.idexamTitre.idexamTitre ,{data:Question}).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));  
  }
  Addchoice(choix:string,Question:ExamQuestion){
    return this.http.post(url + `api/prof/exam/question/choice/add/`+Question.idexamQuestion ,{data:choix}).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));  
  }
  GetlastQuestion(Exam:ExamTitre){
    return this.http.get(url + `api/prof/exam/question/last/`+Exam.idexamTitre).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));  
  }

  RemoveChoix(Choix:Choix){
    return this.http.delete(url + `api/prof/exam/question/choice/remove/`+Choix.idchoix).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));  
  }
  RemoveQuestion(Question:ExamQuestion){
    return this.http.delete(url + `api/prof/exam/question/remove/`+Question.idexamQuestion).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));     
  }
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
