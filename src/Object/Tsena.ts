import { Time } from "@angular/common";
import { Villei } from "./Villei";

export class Tsena {
    tel1: string;
    tel2: string;
    tel3: string;
    adrt: string;
    adrt2: string;
    niveau: string;
    nomt: string;
    proprietaire: string;
    responsable: string;
    hfermeture: Time;
    houverture: Time;
    localite: string;
    faritany: string;
    zone: number;
    quartierv: string;
    reperage: string;
    jourf: string;
    datef: Date;
    ouvert: boolean;
    type: string;
    idville?: Villei;
    codet?: number;
    constructor(
        nomt: string,
        proprietaire: string,
        responsable: string,
        type: string,
        reperage: string,
        localite: string,
        faritany: string,
        zone: number,
        quartierv: string,
        adrt: string,
        adrt2: string,
        tel1: string,
        tel2: string,
        tel3: string,
        niveau: string,
        hfermeture: Time,
        houverture: Time,
        jourf: string,
        datef: Date,
        ouvert: boolean,
        idville?: Villei, 
        codeT?:number) {
        this.type = type;
        this.quartierv = quartierv;
        this.zone = zone;
        this.idville = idville;
        this.localite = localite;
        this.tel1 = tel1;
        this.tel2 = tel2;
        this.tel3 = tel3;
        this.adrt = adrt;
        this.adrt2 = adrt2;
        this.niveau = niveau;
        this.faritany = faritany;
        this.hfermeture = hfermeture;
        this.houverture = houverture;
        this.reperage = reperage;
        this.nomt = nomt;
        this.proprietaire = proprietaire;
        this.responsable = responsable;
        this.jourf = jourf;
        this.ouvert = ouvert;
        this.datef = datef;
        this.codet =codeT;
    }
}