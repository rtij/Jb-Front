import { Stocke } from "./Stocke";
import { Livrables } from "./Livrables";

export class Detlivrables {
    sortie: number;
    stockd:number;
    appro: number;
    prix: number;
    t: string;
    idstocke: Stocke;
    idlivrable: Livrables;
    iddetlivrable?: number;
    constructor(idlivrable: Livrables, t: string,stockd:number,  sortie: number, appro: number, prix: number, stocke: Stocke) {
        this.sortie = sortie;
        this.appro = appro;
        this.prix = prix;
        this.t = t;
        this.stockd = stockd;
        this.idlivrable = idlivrable;
        this.idstocke = stocke;
    }

}