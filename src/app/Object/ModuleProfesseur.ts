import { Module } from "./Module";
import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";
import { Professeur } from "./Professeur";

export class ModuleProfesseur {
    idparcours:Parcours;
    idprofesseur: Professeur;
    idniveau: Niveau;
    idmodule:Module;
    suppr:boolean;
    idprofesseurModule?: number;
    constructor(prof: Professeur,module:Module, idniveau: Niveau,suppr:boolean,parcours:Parcours) {
        this.idprofesseur = prof;
        this.idniveau = idniveau;
        this.suppr = suppr;
        this.idparcours = parcours;
        this.idmodule = module;
    }
}