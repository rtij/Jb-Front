import { Users } from "./Users";

export class Mouvement {
    action: string;
    datem: Date;
    source: string;
    idsourcef: string;
    idsource:Users;
    iddestinataire: Users;
    destinatairef: string;
    iddest:string;
    livreur: string;
    refdoc:string;
    idmvt?: number;
    constructor(action: string, datem: Date, source: string, idsourcef: string, idsource: Users, iddestinataire: Users, destinatairef: string, livreur: string, refdoc: string,iddest:string, idmvt?: number) {
        this.action = action;
        this.datem = datem;
        this.source = source;
        this.idsourcef = idsourcef;
        this.livreur  = livreur;
        this.refdoc = refdoc;
        this.destinatairef = destinatairef;
        this.idsource = idsource;
        this.iddestinataire = iddestinataire;
        this.iddest = iddest;
    }
}