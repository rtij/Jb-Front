import { Users } from "./Users";

export class Authtoken{
    codeu:Users;
    token:string;
    datet:Date;
    idtoken?:number
    constructor(codeu:Users,token:string,datet:Date, idtoken?:number){
        this.codeu = codeu;
        this.token  = token;
        this.datet = datet;
        this.idtoken = idtoken;
    }
}