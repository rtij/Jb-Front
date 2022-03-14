import { Article } from "./Article";
import { Mouvement } from "./Mvt";

export class DetailsMvt{
    idarticle:Article;
    couleur:string;
    qte:number;
    aretourner:boolean;
    usages:string;
    dater:Date;
    ok:boolean;
    idmvt:Mouvement;
    iddetmvt?:number;
    constructor(idmvt:Mouvement, usages:string,idarticle:Article,qte:number,couleur:string,dater:Date,aretourner:boolean,ok:boolean, iddetmvt?:number){
        this.idarticle = idarticle;
        this.aretourner = aretourner;
        this.qte = qte;
        this.couleur = couleur;
        this.ok = ok;
        this.idmvt = idmvt;
        this.iddetmvt = iddetmvt;
        this.dater = dater;
        this.usages = usages;
    }
}