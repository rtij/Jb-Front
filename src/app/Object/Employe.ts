export class Employe{
    code:string;
    contact:string;
    email:string;
    nom:string;
    prenom:string;
    datenaiss:Date;
    motdepasse:string;
    suppr:boolean;
    civilite:string;
    civiliteNum:boolean;
    idemploye?:number;
    constructor(code:string,civiliteNum:boolean,civilite:string,suppr:boolean,datenaiss:Date,contact:string,email:string,nom:string,prenom:string,motdepasse:string){
        this.code = code
        this.contact = contact;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.datenaiss = datenaiss;
        this.motdepasse = motdepasse;
        this.suppr = suppr;
        this.civilite = civilite;
        this.civiliteNum = civiliteNum;
    }
}