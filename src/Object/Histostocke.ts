import { Stocke } from "./Stocke";

export class Histoe {
    vente: number;
    appro: number;
    dateh: Date;
    qter: number;
    idstocke:Stocke;
    idhistoe?: number;
    constructor(dateh: Date, appro: number, vente: number, qter: number,idstocke:Stocke) {
        this.vente = vente;
        this.appro = appro;
        this.dateh = dateh;
        this.qter = qter;
        this.idstocke = idstocke;
    }
}