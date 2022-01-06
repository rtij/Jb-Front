export class Niveau {
    nom: string;
    suppr: boolean;
    idniveau?: number;
    constructor(nom: string, suppr: boolean,id?:number) {
        this.nom = nom;
        this.suppr = suppr;
        this.idniveau = id;
    }
}