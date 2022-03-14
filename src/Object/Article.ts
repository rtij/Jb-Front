export class Article{
    designation:string;
    type:string;
    prixu:number;
    qte:number;
    issup:boolean;
    idarticle?:number;
    constructor(designation:string,type:string,qte:number,prixu:number,issup:boolean, idarticle?:number){
        this.qte = qte;
        this.prixu  = prixu;
        this.designation =  designation;
        this.type =type;
        this.issup = false;
        this.idarticle = idarticle;
    }
}