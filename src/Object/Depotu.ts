import { Users } from "./Users";
import { Tsena } from "./Tsena";
import { Time } from "@angular/common";
export class Depotu{
    action:string;
    dated:Date;
    heured:Time;
    type:string;
    numu:string;
    place:string;
    nbenv:number;
    nbaff:number;
    isany:number;
    codet:Tsena;
    codeu:Users;
    iddep?:number;
    constructor(action:string, dated:Date, heured:Time,Type:string,numu:string,isany:number, place:string,codet:Tsena,codeu:Users,nbenv:number, nbaff:number){
        this.nbaff = nbaff;
        this.nbenv = nbenv;
        this.action = action;
        this.dated = dated;
        this.type  = Type;
        this.numu  = numu;
        this.place = place;
        this.heured = heured;
        this.codet = codet;
        this.codeu  = codeu;
        this.isany = isany;
    }
}