import { Users } from "./Users";

export class Contacts{
    contacts:string;
    codeu:Users;
    idcontacts?:number;
    constructor(contacts:string, codeu:Users){
        this.codeu = codeu;
        this.contacts = contacts;
    }
}