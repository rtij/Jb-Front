import { Niveau } from "./Niveau";
import { Parcours } from "./Parcours";

export class Etudiant {
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
    idetudiant?: number;
    constructor(
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