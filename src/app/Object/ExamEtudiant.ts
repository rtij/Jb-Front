import { Etudiant } from "./Etudiant";
import { ExamTitre } from "./ExamTitre";

export class ExamEtudiant{
    idetudiant:Etudiant;
    idexamTitre:ExamTitre;
    idexamEtudiant:number;
    constructor(idexamTitre:ExamTitre,idetudiant:Etudiant,idexamEtudiant:number){
        this.idetudiant = idetudiant;
        this.idexamTitre = idexamTitre;
        this.idexamEtudiant = idexamEtudiant;
    }
}