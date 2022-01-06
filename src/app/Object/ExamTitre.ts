import { Time } from "@angular/common";
import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";
import { Professeur } from "./Professeur";
import {Module} from './Module';

export class ExamTitre {
    titre: string;
    dureeI: string;
    diffusion: Date;
    idniveau: Niveau;
    idparcours: Parcours;
    idprofesseur: Professeur;
    idmodule:Module;
    debut:Time;
    duree:Time;
    idexamTitre?: number;
    constructor(titre: string,dureeI:string,Debut:Time,Duree:Time, idparcours: Parcours, idprofesseur: Professeur,idmodule:Module, diffusion: Date, idniveau: Niveau,idExamTitre?:number) {
        this.idniveau = idniveau;
        this.titre = titre;
        this.idparcours =idparcours;
        this.idprofesseur= idprofesseur;
        this.diffusion = diffusion;
        this.dureeI = dureeI;
        this.debut = Debut;
        this.duree = Duree;
        this.idmodule = idmodule;
        this.idexamTitre = idExamTitre;
    }
}