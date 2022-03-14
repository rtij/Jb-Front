import { Article } from "./Article";
import { Equipe } from "./Equipe";

export class Stocke{
    idequipe:Equipe
    idarticle:Article;
    qte:number;
    idstocke?:number;
    constructor(idequipe:Equipe, idarticle:Article, qte:number, idstocke?:number){
        this.idequipe = idequipe;
        this.idarticle = idarticle;
        this.qte = qte;
        this.idstocke = idstocke;
    }
}