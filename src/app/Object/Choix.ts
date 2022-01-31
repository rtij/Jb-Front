import { ExamQuestion } from "./ExamQuestion";

export class Choix{
    choix:string;
    idexamQuestion:ExamQuestion;
    idchoix?:number;
    constructor(choix:string,idexamQuestion:ExamQuestion){
        this.choix = choix;
        this.idexamQuestion = idexamQuestion;
    }
}