import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Choix } from './Object/Choix';
import { DocEtudiant } from './Object/docEtudiant';
import { DocLien } from './Object/DocLien';
import { Documents } from './Object/Documents';
import { Etudiant } from './Object/Etudiant';
import { ExamEtudiant } from './Object/ExamEtudiant';
import { ExamQuestion } from './Object/ExamQuestion';
import { ExamTitre } from './Object/ExamTitre';
import { DateToShortDate, GetResultTime, getTimeLocaleTime } from './Object/Function';
import { MessageEtudiant } from './Object/MessageEtudiant';
import { ModuleProfesseur } from './Object/ModuleProfesseur';
import { MsgEnseingnant } from './Object/MsgEnseingant';
import { Parcours } from './Object/Parcours';
import { Professeur } from './Object/Professeur';
import { QuestionType } from './Object/QuestionType';
import { Responsabilite } from './Object/Responsabilite';
import { url } from './Service/Proxy';

@Injectable({
  providedIn: 'root'
})
export class ProfService {

  constructor(private http: HttpClient) { }

  Prof!: Professeur;
  ProfCours:ModuleProfesseur[] = [];
  ProfModule!: ModuleProfesseur[];
  Docs!: Documents[];
  Etudiants!: Etudiant[];
  EtudiantListe: Etudiant[] = [];
  ProfesseurListe: Professeur[] = [];
  Exam!: ExamTitre;
  response: string = "";
  last!: number;
  QuestionType!: QuestionType[];
  ExamQuestionListe!: ExamQuestion[];
  ExamLastQuestion!: ExamQuestion;
  ExamTitreListe!: ExamTitre[];
  selectedExam!: ExamTitre;
  ExamEtudiant: ExamEtudiant[] = [];
  selectedExamEtudiant!: ExamEtudiant;
  ExamReponse!: ExamEtudiant;
  selectedCours!: Documents;
  docEtudiantListe: DocEtudiant[] = [];
  selectedDocEtudiant!: DocEtudiant;
  ReceivedMessageEtudiant: MessageEtudiant[] = [];
  SendedMessageEtudiant: MessageEtudiant[] = [];
  selectedEtudiant!: Etudiant;
  selectedProfesseur!: Professeur;
  ResponsabiliteListe: Responsabilite[] = [];
  ProfSendMessage: MsgEnseingnant[] = [];
  ProfReceiveMessage: MsgEnseingnant[] = [];
  EtudiantFinalListe:Etudiant[] = [];
  ProfesseurFinalListe:Professeur[] = [];
  EtudiantResponsabiliteListe:Etudiant[] = [];
  // Data communication
  SetSelectedExam(Exam: ExamTitre) {
    this.selectedExam = Exam;
    return this.selectedExam;
  }
  UnsetSelectedExam() {
    const it: any = undefined;
    this.selectedExam = it;
  }
  // 
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
        this.ProfCours = res['data'];
        return this.ProfCours;
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

  //Course service
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
  // Exam service
  getLastID() {
    return this.http.get(url + `api/prof/docs/last`).pipe(
      map((res: any) => {
        this.last = res['data'];
        return this.last;
      }),
      catchError(this.handleError));
  }
  getExamListe() {
    return this.http.get(url + `api/prof/exam/list`).pipe(
      map((res: any) => {
        const liste = res['data'];
        this.ExamTitreListe = [];
        liste.forEach((item: any) => {
          const Exam: ExamTitre = new ExamTitre(item.titre, item.dureeI, GetResultTime(item.hDebut), GetResultTime(item.duree), item.idparcours, item.idprofesseur, item.idmodule, DateToShortDate(item.diffusion), item.idniveau, item.idexamQuestion, item.idexamTitre);
          this.ExamTitreListe.push(Exam);
        });
        return this.ExamTitreListe;
      }),
      catchError(this.handleError));
  }
  createExam(Exam: ExamTitre) {
    return this.http.post(url + `api/prof/exam/ajout`, { data: Exam }).pipe(
      map((res: any) => {
        const data: any = res['data'];
        const Exam: ExamTitre = new ExamTitre(data.titre, data.dureeI, GetResultTime(data.hDebut), GetResultTime(data.duree), data.idparcours, data.idprofesseur, data.idmodule, DateToShortDate(data.diffusion), data.idniveau, [], data.idexamTitre);
        this.Exam = Exam;
        return this.Exam;
      }),
      catchError(this.handleError));
  }
  RemoveExam(Exam: ExamTitre) {
    return this.http.delete(url + `api/prof/exam/remove/` + Exam.idexamTitre).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));
  }

  EditExam(Exam: ExamTitre) {
    return this.http.post(url + `api/prof/exam/edit/` + Exam.idexamTitre, { data: Exam }).pipe(
      map((res: any) => {
        const data: any = res['data'];
        const Exam: ExamTitre = new ExamTitre(data.titre, data.dureeI, GetResultTime(data.hDebut), GetResultTime(data.duree), data.idparcours, data.idprofesseur, data.idmodule, DateToShortDate(data.diffusion), data.idniveau, data.idexamTitre);
        this.Exam = Exam;
        return this.Exam;
      }),
      catchError(this.handleError));
  }

  getLastExam(): Observable<ExamTitre> {
    return this.http.get(url + `api/prof/exam/last`).pipe(
      map((res: any) => {
        const data: any = res['data'];
        const Exam: ExamTitre = new ExamTitre(data.titre, data.dureeI, GetResultTime(data.hDebut), GetResultTime(data.duree), data.idparcours, data.idprofesseur, data.idmodule, DateToShortDate(data.diffusion), data.idniveau, data.idexamTitre);
        this.Exam = Exam;
        return this.Exam;
      }),
      catchError(this.handleError));
  }
  FindExam(Exam: ExamTitre) {
    return this.http.get(url + `api/prof/exam/get/` + Exam.idexamTitre).pipe(
      map((res: any) => {
        const data: any = res['data'];
        const Exam: ExamTitre = new ExamTitre(data.titre, data.dureeI, GetResultTime(data.hDebut), GetResultTime(data.duree), data.idparcours, data.idprofesseur, data.idmodule, DateToShortDate(data.diffusion), data.idniveau, data.idexamTitre);
        this.Exam = Exam;
        return this.Exam;
      }),
      catchError(this.handleError));
  }
  SetExamFinished(Exam: ExamTitre) {
    return this.http.put(url + `api/prof/exam/finish/` + Exam.idexamTitre, { data: Exam }).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));
  }
  getQuestionType() {
    return this.http.get(url + `api/prof/exam/question/type`).pipe(
      map((res: any) => {
        this.QuestionType = res['data'];
        return this.QuestionType;
      }),
      catchError(this.handleError));
  }
  AddQuestion(Question: ExamQuestion) {
    return this.http.post(url + `api/prof/exam/question/add/` + Question.idexamTitre.idexamTitre, { data: Question }).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));
  }
  Addchoice(choix: string, Question: ExamQuestion) {
    return this.http.post(url + `api/prof/exam/question/choice/add/` + Question.idexamQuestion, { data: choix }).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));
  }
  GetlastQuestion(Exam: ExamTitre) {
    return this.http.get(url + `api/prof/exam/question/last/` + Exam.idexamTitre).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));
  }

  RemoveChoix(Choix: Choix) {
    return this.http.delete(url + `api/prof/exam/question/choice/remove/` + Choix.idchoix).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));
  }
  RemoveQuestion(Question: ExamQuestion) {
    return this.http.delete(url + `api/prof/exam/question/remove/` + Question.idexamQuestion).pipe(
      map((res: any) => {
        return this.response = res['data'];
      }),
      catchError(this.handleError));
  }
  // Edit Quesiton service
  EditQuestion(Question: ExamQuestion) {
    return this.http.put(url + `api/prof/exam/question/edit/` + Question.idexamQuestion, { data: Question }).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));
  }
  GetQuestion(Question: ExamQuestion) {
    return this.http.post(url + `api/prof/exam/question/getQuestion`, { data: Question }).pipe(
      map((res: any) => {
        return this.ExamLastQuestion = res['data'];
      }),
      catchError(this.handleError));
  }
  // Response service
  getExamEtudiantList(Exam: ExamTitre) {
    return this.http.get(url + `api/prof/exam/etudiant/list/` + Exam.idexamTitre).pipe(
      map((res: any) => {
        return this.ExamEtudiant = res['data'];
      }),
      catchError(this.handleError));
  }

  GetResponse() {
    return this.http.get(url + `api/prof/exam/etudiant/response/` + this.selectedExam.idexamTitre + '/' + this.selectedExamEtudiant.idetudiant).pipe(
      map((res: any) => {
        return this.ExamReponse = res['data'];
      }),
      catchError(this.handleError));
  }

  GetCoursReply() {
    return this.http.get(url + `api/prof/cours/response/` + this.selectedCours.iddocument).pipe(
      map((res: any) => {
        return this.docEtudiantListe = res['data'];
      }),
      catchError(this.handleError));
  }
  selectExamEtudiant(ExamEtudiant: ExamEtudiant) {
    this.selectedExamEtudiant = ExamEtudiant;
  }

  SetDocViewed() {
    return this.http.get(url + `api/prof/cours/response/vue/` + this.selectedCours.iddocument + '/' + this.selectedDocEtudiant.iddocEtudiant).pipe(
      map((res: any) => {
        return this.docEtudiantListe = res['data'];
      }),
      catchError(this.handleError));
  }

  // MEssage part
  getEtudiantReceivedMessage() {
    return this.http.get(url + `api/prof/message/etudiant/received/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        return this.ReceivedMessageEtudiant = res['data'];
      }),
      catchError(this.handleError));
  }

  getEtudiantSendedMessage() {
    return this.http.get(url + `api/prof/message/etudiant/sended/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        return this.SendedMessageEtudiant = res['data'];
      }),
      catchError(this.handleError));
  }

  SendEtudiantMessage(message: string) {
    return this.http.post(url + `api/prof/message/` + this.selectedEtudiant.idetudiant + '/' + this.Prof.idprofesseur, { message: message }).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  SendEtudiantMessageFile(Doc: FormData) {
    return this.http.post(url + `api/prof/message/file/` + this.selectedEtudiant.idetudiant + '/' + this.Prof.idprofesseur, Doc).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  SendProfMessage(MsgEnseignant: MsgEnseingnant) {
    return this.http.post(url + `api/prof/message/SendProf/` + this.Prof.idprofesseur, { data: MsgEnseignant }).pipe(
      map((res: any) => {
        this.response = res['data'];
        return this.response;
      }),
      catchError(this.handleError)
    );
  }

  getLastSendedMessage() {
    return this.http.get(url + `api/prof/message/etudiant/lastS/` + this.Prof.idprofesseur).pipe
      (map((res: any) => {
        let n = res['data'];
        return n;
      }),
        catchError(this.handleError));
  }

  getLastReceivedMessage() {
    return this.http.get(url + `api/prof/message/etudiant/lastR/` + this.Prof.idprofesseur).pipe
      (map((res: any) => {
        let n = res['data'];
        return n;
      }),
        catchError(this.handleError));
  }
  // ProfMessage
  GetResponsabilite() {
    return this.http.get(url + `api/prof/responsabilite/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        this.ResponsabiliteListe = res['data'];
        return this.ResponsabiliteListe;
      }),
      catchError(this.handleError)
    );
  }

  getProfSendMessage() {
    return this.http.get(url + `api/prof/message/SendProf/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        this.ProfSendMessage = res['data'];
        return this.ProfSendMessage;
      }),
      catchError(this.handleError)
    );
  }

  getProfReceivedMessage() {
    return this.http.get(url + `api/prof/message/ProfR/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        this.ProfReceiveMessage = res['data'];
        return this.ProfReceiveMessage;
      }),
      catchError(this.handleError)
    );
  }

  getLastProfReceiveMessage() {
    return this.http.get(url + `api/prof/message/ReceiveProf/last/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        let n = res['data'];
        return n;
      }),
      catchError(this.handleError)
    );
  }

  getLastProfSendMessage() {
    return this.http.get(url + `api/prof/message/SendProf/last/` + this.Prof.idprofesseur).pipe(
      map((res: any) => {
        let n = res['data'];
        return n;
      }),
      catchError(this.handleError)
    );
  }

  getEtudiantCours(Module: ModuleProfesseur) {
    return this.http.get(url + `api/prof/etudiant/cours/liste/` + Module.idprofesseurModule).pipe(
      map((res: any) => {
        let n = res['data'];
        return n;
      }),
      catchError(this.handleError)
    );
  }

  getEtudiantByParcours(Parcours:Parcours){
    return this.http.get(url + `api/prof/etudiant/parcours/liste/` + Parcours.idparcours).pipe(
      map((res: any) => {
        let n = res['data'];
        return n;
      }),
      catchError(this.handleError)
    );
  }

  getProfbyParcours(Parcours:Parcours){
    return this.http.get(url + `api/prof/prof/parcours/liste/` + Parcours.idparcours).pipe(
      map((res: any) => {
        let n = res['data'];
        return n;
      }),
      catchError(this.handleError)
    );
  }
  // Handle Error
  private handleError(error: HttpErrorResponse) {
    console.log(error.error);
    // return an observable with a user friendly message
    return throwError(error);
  }
}
