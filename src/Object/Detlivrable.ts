import { Stocke } from "./Stocke";
import { Livrables } from "./Livrables";

export class Detlivrables {
    sortie: number;
    prix: number;
    t: string;
    idstocke: Stocke;
    idlivrables: Livrables;
    iddetlivrable?: number;
    constructor(idlivrable: Livrables, t: string,  sortie: number, prix: number, stocke: Stocke) {
        this.sortie = sortie;
        this.prix = prix;
        this.t = t;
        this.idlivrables = idlivrable;
        this.idstocke = stocke;
    }

}