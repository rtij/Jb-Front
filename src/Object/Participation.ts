import { Users } from "./Users";

export class Participation{
    codeu:Users
    faritany:string="";
    dates:Date;
    numenv:number;
    teltelma:string;
    telairtel:string;
    telorange:string;
    nbp:number; 
    adrp:string;
    nomp:string;
    idparticipation?:number;    
    constructor(dates:Date,Users:Users,nomp:string,adrp:string, faritany:string, numenv:number,teltelma:string, telairtel:string, telorange:string, nbp:number,  ){
        this.dates = dates;
        this.numenv = numenv;
        this.nomp = nomp;
        this.adrp = adrp;
        this.telairtel = telairtel;
        this.telorange = telorange;
        this.teltelma = teltelma;
        this.nbp = nbp;
        this.codeu = Users;
        this.faritany = faritany;
    }
}