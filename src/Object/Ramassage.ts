import { Depotu } from "./Depotu";
import { Tsena } from "./Tsena";
import { Users } from "./Users";

export class Ramassage {
    codeu: Users;
    codet: Tsena;
    action: string;
    dater: Date;
    iddep:Depotu;
    ramassagea: boolean;
    idramassage?: number;
    constructor(action: string, dateR: Date, codeu: Users, codet: Tsena, iddep: Depotu, ramassage: boolean, idramassage?: number) {
        this.dater = dateR;
        this.codet = codet;
        this.action = action;
        this.codeu = codeu;
        this.iddep = iddep;
        this.ramassagea = ramassage;
        this.idramassage = idramassage;
    }
}