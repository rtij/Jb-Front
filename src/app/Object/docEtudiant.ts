import { Documents } from "./Documents";
import { Etudiant } from "./Etudiant";

export class DocEtudiant {

    titre: string;
    description: string;
    iddocument: Documents;
    date: Date;
    url:string;
    nomFichier:string;
    vu:boolean;
    idetudiant: Etudiant;
    iddocEtudiant?:number;
    constructor(titre: string, description: string, date: Date,nomFichier:string,url:string, idetudiant: Etudiant, iddocument: Documents,vu:boolean,
        iddocetudiant?:number
        ) {
        this.titre = titre;
        this.description = description;
        this.date = date;
        this.nomFichier = nomFichier;
        this.iddocument = iddocument;
        this.idetudiant = idetudiant;
        this.vu = vu;
        this.url = url;
        this.iddocEtudiant = iddocetudiant;
    }
}