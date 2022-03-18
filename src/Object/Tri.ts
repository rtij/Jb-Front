import { Users } from "./Users"

export class Tri {
    action: string
    codeu: Users
    datetri: Date;
    numenv: number
    feno: boolean;
    nbpp: number;
    nbvi: number;
    nboe: number;
    nbps: number
    total: number
    motifinv: string;
    faritany: string;
    nomprenom: string;
    valide:boolean;
    idTri?: number;

    constructor(
        action: string,
        codeu: Users,
        datetri: Date,
        numenv: number,
        feno: boolean,
        valide:boolean,
        nbpp: number,
        nbvi: number,
        nboe: number,
        nbps: number,
        total: number,
        motifinv: string,
        faritany: string,
        nomprenom: string,

    ) {
        this.action = action
        this.codeu = codeu
        this.datetri = datetri
        this.numenv = numenv
        this.feno = feno;
        this.nbpp = nbpp
        this.nbvi = nbvi
        this.nboe = nboe
        this.nbps = nbps;
        this.total = total;
        this.motifinv = motifinv
        this.faritany = faritany
        this.nomprenom = nomprenom
        this.valide = valide;
    }
}