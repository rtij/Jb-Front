import { Article } from "./Article";

export class HistoStock{
    dateh:Date;
    qter:number;
    qtee:number;
    qtes:number;
    idarticle:Article;
    idhisto?:number;
    constructor(dateh:Date,qtes:number,qter:number,qtee:number,idarticle:Article){
        this.dateh = dateh;
        this.qter = qter;
        this.qtes = qtes;
        this.qtee = qtee;
        this.idarticle = idarticle;
    }
}