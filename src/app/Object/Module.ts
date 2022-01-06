import { UniteEnseignement } from "./UniteEnseignement";

export class Module {
    iduniteEnseignement: UniteEnseignement;
    nom: string;
    suppr: boolean;
    idmodule?: number;
    constructor(nom: string, unite: UniteEnseignement, suppr: boolean) {
        this.nom = nom;
        this.suppr = suppr;
        this.iduniteEnseignement = unite;
    }
}