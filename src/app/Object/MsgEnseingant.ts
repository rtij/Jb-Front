import { Time } from "@angular/common";
import { Professeur } from "./Professeur";

export class MsgEnseingnant {
    iddestinataire:Professeur;
    idexpediteur:Professeur;
    heure:Time;
    date:Date
    message:string;
    idmsgEnseignant?:number;
    vu:boolean;
    constructor(message:string,date:Date,heure:Time,iddestinataire:Professeur,idexpediteur:Professeur,vu:boolean) {
        this.heure = heure;
        this.iddestinataire = iddestinataire;
        this.idexpediteur = idexpediteur;
        this.date = date
        this.message = message;
        this.vu = vu;
    }
}