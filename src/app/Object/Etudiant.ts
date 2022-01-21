import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";
import {Annee} from "./Annee";

export class Etudiant {
    code:string;
    matricule: string;
    nom: string;
    prenom: string;
    datenaiss: Date;
    contact: string;
    email: string;
    idparcours: Parcours;
    motdepasse: string;
    idniveau: Niveau;
    suppr: boolean;
    idanneeUniversitaire:Annee;
    idetudiant?: number;
    constructor(
        code:string,
        idanneeUniversitaire:Annee,
        nom: string, 
        prenom: string, 
        datenaiss: Date, 
        matricule: string, 
        motdepasse: string, 
        contact: string, 
        email: string,
        niveau: Niveau, 
        idparcouurs:Parcours,
        suppr: boolean, id?: number
        ) {
        this.idanneeUniversitaire = idanneeUniversitaire
        this.code = code
        this.matricule = matricule;
        this.nom = nom;
        this.motdepasse = motdepasse;
        this.email = email;
        this.prenom = prenom;
        this.idparcours = idparcouurs;
        this.datenaiss = datenaiss;
        this.contact = contact;
        this.idniveau = niveau;
        this.suppr = suppr;
        this.idetudiant = id;
    }
}