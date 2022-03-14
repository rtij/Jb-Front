
import { Equipe } from "./Equipe";
import { TypeU } from "./TypeU";

export class Users{
    password:string;
    nomu:string;
    telAirtel:string;
    telTelma:string;
    telOrange:string;
    idtypeu:TypeU;
    issup:boolean;
    idequipe?:Equipe;
    codeu?:number;
    constructor( nom:string, password:string,telAirtel:string, telOrange:string, telTelma:string, idTypeU:TypeU,issup:boolean, idequipe?:Equipe, CodeU?:number){
       this.password = password;
        this.nomu = nom;
        this.telAirtel = telAirtel;
        this.telTelma = telTelma;
        this.telOrange = telOrange;
        this.idtypeu = idTypeU;
        this.idequipe = idequipe;
        this.codeu = CodeU;
        this.issup = issup;
    }
}