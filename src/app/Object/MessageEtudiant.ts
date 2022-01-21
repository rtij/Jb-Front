import { Time } from "@angular/common";
import { Etudiant } from "./Etudiant";
import { Professeur } from "./Professeur";

export class MessageEtudiant {
    message:string;
    urlfile:string;
    vue:boolean;
    professeurM:boolean;
    idprofesseur:Professeur;
    datem:Date;
    heureM:Time;
    idmessage?:number;
    constructor(message:string,ProfesseurM:boolean,urlfile:string,dateM:Date,heureM:Time, vue:boolean,idetudiant:Etudiant,idprofesseur:Professeur,idmessage:number) {
        this.urlfile = urlfile;
        this.professeurM = ProfesseurM;
        this.vue = vue;
        this.message = message;
        this.idprofesseur = idprofesseur;
        this.datem = dateM;
        this.heureM = heureM;
        this.idmessage = idmessage;
    }
}