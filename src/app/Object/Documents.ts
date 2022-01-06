import { DocLien } from "./DocLien";
import { Module } from "./Module";
import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";

export class Documents {
    aRendre: Date;
    expiration: Date;
    diffusion: Date;
    creation: Date;
    description: string;
    titre: string;
    type: string;
    idmodule:Module;
    idparcours:Parcours;
    idniveau:Niveau;
    iddocument?: number;
    doclien:DocLien[];
    suppr:boolean;
    constructor(arendre: Date,idmodule:Module,idniveau:Niveau,idparcours:Parcours, expiration: Date, diffusion: Date, creation: Date, description: string, titre: string, type: string,docLien:DocLien[],suppr:boolean) {
        this.aRendre = arendre;
        this.description = description;
        this.creation = creation;
        this.titre = titre;
        this.idmodule = idmodule;
        this.idniveau = idniveau;
        this.idparcours = idparcours;
        this.type = type;
        this.expiration = expiration;
        this.doclien = docLien;
        this.diffusion = diffusion;
        this.suppr = suppr;
    }

}