import { Villei } from "./Villei";

export class Equipe {
    equipe: string;
    issup: boolean;
    faritany: string;
    localite: string;
    zonea: number;
    quartierv: string;    
    idvillei: Villei;
    idequipe?: number;
    constructor(equipe: string, issup: boolean, zonea: number, quartierv: string, localite: string, faritany: string, Villei: Villei, idEquipe?: number) {
        this.equipe = equipe;
        this.issup = issup;
        this.zonea = zonea;
        this.localite = localite;
        this.faritany = faritany;
        this.quartierv = quartierv;
        this.idvillei = Villei;
        this.idequipe = idEquipe;
    }
}