export class Professeur{
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
    formateur:string;
    idprofesseur?:number;
    constructor(formateur:string,code:string,civiliteNum:boolean,civilite:string,suppr:boolean,datenaiss:Date,contact:string,email:string,nom:string,prenom:string,motdepasse:string){
        this.code = code
        this.contact = contact;
        this.email = email;
        this.nom = nom;
        this.prenom = prenom;
        this.datenaiss = datenaiss;
        this.motdepasse = motdepasse;
        this.suppr = suppr;
        this.civilite = civilite;
        this.formateur = formateur;
        this.civiliteNum = civiliteNum;
    }
}