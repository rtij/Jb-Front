import { Time } from "@angular/common";
import { Etudiant } from "./Etudiant";
import { Professeur } from "./Professeur";

export class MessageEtudiant {
    message:string;
    filename:string;
    urlfile:string;
    vue:boolean;
    professeurm:boolean;
    idprofesseur:Professeur;
    idetudiant:Etudiant;
    datem:Date;
    heureM:Time;
    idmessage?:number;
    constructor(message:string,ProfesseurM:boolean,filename:string,urlfile:string,dateM:Date,heureM:Time, vue:boolean,idetudiant:Etudiant,idprofesseur:Professeur,idmessage:number) {
        this.urlfile = urlfile;
        this.filename = filename;
        this.professeurm = ProfesseurM;
        this.vue = vue;
        this.message = message;
        this.idprofesseur = idprofesseur;
        this.datem = dateM;
        this.idetudiant = idetudiant;
        this.heureM = heureM;
        this.idmessage = idmessage;
    }
}