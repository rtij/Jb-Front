export class UniteEnseignement {
    nom:string;
    suppr:boolean;
    iduniteEnseignement?:number;
    constructor(nom:string,suppr:boolean,id:number) {
        this.nom = nom;
        this.suppr = suppr;
        this.iduniteEnseignement = id;
    }
}