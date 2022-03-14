export class Villei {
    libelle: string;
    issup:boolean;
    idvillei?: number;
    constructor(libelle: string,issup:boolean, idville?: number) {
        this.libelle = libelle;
        this.issup = issup;
        this.idvillei = idville;
    }
}