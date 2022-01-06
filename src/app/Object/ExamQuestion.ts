import { Choix } from "./Choix";
import { ExamTitre } from "./ExamTitre";
import { QuestionType } from "./QuestionType";

export class ExamQuestion {
    idtype:QuestionType;
    question:string;
    numQuestion:number;
    idexamTitre:ExamTitre;
    idexamQuestion?:number;
    questionChoice:Choix[];
    constructor(idexamTitre:ExamTitre,numQuestion:number,question:string,idtype:QuestionType,choix:Choix[]){
        this.idexamTitre = idexamTitre;
        this.numQuestion = numQuestion;
        this.question = question;
        this.idtype = idtype;
        this.questionChoice = choix;
    }
}