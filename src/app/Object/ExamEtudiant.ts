import { Etudiant } from "./Etudiant";
import { ExamReponse } from "./ExamReponse";
import { ExamTitre } from "./ExamTitre";

export class ExamEtudiant{
    idetudiant:Etudiant;
    idexamTitre:ExamTitre;
    idexamEtudiant:number;
    idexamReponse:ExamReponse[];
    constructor(idexamTitre:ExamTitre,idetudiant:Etudiant,idexamEtudiant:number,examReponse:ExamReponse[]){
        this.idetudiant = idetudiant;
        this.idexamTitre = idexamTitre;
        this.idexamEtudiant = idexamEtudiant;
        this.idexamReponse = examReponse;
    }
}