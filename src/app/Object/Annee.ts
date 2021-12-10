export class Annee{
    annee:string;
    encours:boolean;
    idanneeUniversitaire?:number;
    constructor(
        Annee:string,
        EnCours:boolean,
        AnneeUn:number
    ){
        this.annee = Annee;
        this.encours = EnCours;
        this.idanneeUniversitaire = AnneeUn
    }
}