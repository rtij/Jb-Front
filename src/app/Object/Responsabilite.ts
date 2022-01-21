import { Parcours } from "./Parcours";
import { Professeur } from "./Professeur";

export class Responsabilite {
    idprofesseur:Professeur;
    idparcours:Parcours;
    idresponsabilite?:number;
    constructor(idparcours:Parcours,idprofesseur:Professeur) {
        this.idparcours = idparcours;
        this.idprofesseur = idprofesseur;
    }
}