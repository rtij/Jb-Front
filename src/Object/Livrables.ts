
import { Users } from "./Users";

export class Livrables{
    contact:number;
    nombrea:number;
    recettej:number;
    numu:string;
    semainec:number;
    typel:string;
    datel:Date;
    envu:number;
    codeu:Users;
    idlivrables?:number;
    constructor(contact:number,envu:number,nombera:number, recettej:number, numu:string, semainec:number, typel:string, datel:Date, codeu:Users){
        this.contact = contact;
        this.nombrea = nombera;
        this.recettej = recettej;
        this.numu = numu;
        this.codeu = codeu;
        this.envu = envu;
        this.semainec = semainec;
        this.typel = typel;
        this.datel = datel;
    }
}