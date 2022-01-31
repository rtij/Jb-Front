import { Choix } from "./Choix";
import { ExamEtudiant } from "./ExamEtudiant";
import { ExamQuestion } from "./ExamQuestion";

export class ExamReponse {
    reponse: string;
    idexamQuestion: ExamQuestion;
    Examtudiant:ExamEtudiant;
    idchoix?:Choix;
    idReponse?:number;
    constructor(ExamEtudiant:ExamEtudiant,reponse: string, idexamQuestion: ExamQuestion,choix?:Choix) {
        this.idexamQuestion = idexamQuestion;
        this.Examtudiant = ExamEtudiant;
        this.reponse = reponse;
        this.idchoix = choix;
    }
}