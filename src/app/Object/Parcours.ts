export class Parcours {
    nom:string;
    suppr:boolean;
    idparcours?:number;
    constructor(suppr:boolean,nom:string,id?:number) {
        this.nom =nom;
        this.suppr =suppr;
        this.idparcours = id;
    }
}